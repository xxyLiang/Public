### HIVE的数据格式

- 文本格式     TEXTFILE
- 二进制序列化文件     SEQUENCEFILE
- 行列式文件 RCFile
- **优化的行列式文件** **ORC** **（Optimized Row Columnar）**
- **面向分析型业务的列式存储格式** **PARQUET**



## DDL

### 库操作

#### 创建库

```hive
CREATE (DATABASE|SCHEMA) [IF NOT EXISTS] database_name
  [COMMENT database_comment]
  [LOCATION hdfs_path]
  [WITH DBPROPERTIES (property_name=property_value, ...)];
```

#### 删除库

```hive
DROP (DATABASE|SCHEMA) [IF EXISTS] database_name [RESTRICT|CASCADE]
```

​		默认情况下，Hive不允许删除一个里面有表存在的数据库，如果想删除数据库，要么先将数据库中的表全部删除，要么可以使用CASCADE关键字，使用该关键字后，Hive会自己将数据库下的表全部删除。RESTRICT关键字就是默认情况，即如果有表存在，则不允许删除数据库。

#### 修改库

``` hive
ALTER (DATABASE|SCHEMA) database_name SET DBPROPERTIES (property_name=property_value, ...);
ALTER (DATABASE|SCHEMA) database_name SET OWNER [USER|ROLE] user_or_role;
```

#### 使用库

```hive
USE database_name;
USE DEFAULT;
```

#### 查看库

```hive
SHOW DATABASES;    --查看库
DESC DATABASE [EXTENDED] dbname;   --显示数据库的详细属性信息
SELECT current_database();   --查看正在使用哪个库
SHOW CREATE DATABASE t3;     --查看创建库的详细语句
```



### 表操作	

#### 创建表

```hive
CREATE [EXTERNAL] TABLE [IF NOT EXISTS] table_name
	[(col_name data_type [COMMENT col_comment], ...)]
	[COMMENT table_comment]
	[PARTITIONED BY (col_name data_type [COMMENT col_comment], ...)]
	[CLUSTERED BY (col_name, col_name, ...)
    	[SORTED BY (col_name [ASC|DESC], ...)] INTO num_buckets BUCKETS]
    [ROW FORMAT row_format]
    [STORED AS file_format]
    [LOCATION hdfs_path]


data_type
  : primitive_type
  | array_type
  | map_type
  | struct_type
  | union_type  -- (Note: Available in Hive 0.7.0 and later)

primitive_type
  : TINYINT
  | SMALLINT
  | INT
  | BIGINT
  | BOOLEAN
  | FLOAT
  | DOUBLE
  | DOUBLE PRECISION -- (Note: Available in Hive 2.2.0 and later)
  | STRING
  | BINARY      -- (Note: Available in Hive 0.8.0 and later)
  | TIMESTAMP   -- (Note: Available in Hive 0.8.0 and later)
  | DECIMAL     -- (Note: Available in Hive 0.11.0 and later)
  | DECIMAL(precision, scale)  -- (Note: Available in Hive 0.13.0 and later)
  | DATE        -- (Note: Available in Hive 0.12.0 and later)
  | VARCHAR     -- (Note: Available in Hive 0.12.0 and later)
  | CHAR        -- (Note: Available in Hive 0.13.0 and later)
 
array_type
  : ARRAY < data_type >
 
map_type
  : MAP < primitive_type, data_type >
 
struct_type
  : STRUCT < col_name : data_type [COMMENT col_comment], ...>
 
union_type
   : UNIONTYPE < data_type, data_type, ... >  -- (Note: Available in Hive 0.7.0 and later)
   
row_format
  : DELIMITED [FIELDS TERMINATED BY char [ESCAPED BY char]] [COLLECTION ITEMS TERMINATED BY char]
        [MAP KEYS TERMINATED BY char] [LINES TERMINATED BY char]
        [NULL DEFINED AS char]   -- (Note: Available in Hive 0.13 and later)
  | SERDE serde_name [WITH SERDEPROPERTIES (property_name=property_value, property_name=property_value, ...)]
```

详见[官网](https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DDL)





## DML

插入数据

```hive
-- 动态分区插入
INSERT [OVERWRITE] TABLE employees
    PARTITION (country, state)
    SELECT ..., se.cnty, se.st    -- 最后两列确定分区字段的值
    FROM staged_emplyees se;
    
-- 静动态分区键结合
INSERT [OVERWRITE] TABLE employees
    PARTITION (country = 'US', state) -- 静态分区键必须出现在动态分区键之前
    SELECT ..., se.cnty, se.st    
    FROM staged_emplyees se
    WHERE se.cnty = 'US';
```





