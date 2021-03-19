>## SQL的功能与特点
&emsp;&emsp;在SQL语言中，把关系模式称为基本表(Base Table)，简称为表；有时在容易与上下文有关概念相混淆的地方也称为关系表。
1. SQL的功能
   - 数据定义功能：包括定义基本表、视图、索引等，由SQL的数据定义语言(DDL)实现。(CREATE, ALTER, DROP)
   - 数据操作功能：包括数据查询和数据更新。由SQL的数据操纵语言(DML)实现。(SELECT, INSERT, UPDATE, DELETE)
   - 数据控制功能：包括用户授权、基本表和视图授权、事务控制、数据完整性和安全性控制等，由SQL的数据控制语言实现(DCL)。(GRANT, REVOKE, DENY)
2. SQL的特点
   - 一体化：集DDL、DML、DCL为一体。
   - 具有交互式命令和嵌入式两种工作方式：在交互式命令工作方式下，用户可以以交互式命令方式通过直接输入SQL命令对数据库进行操作；在嵌入式工作方式下，SQL语句可以被嵌入到某种高级语言程序中实现对数据库的操作。
   - 支持数据库的三级模式结构：外模式、逻辑模式（概念模式）、内模式

<br/><br/>

>## 数据库的创建、删除
### **创建数据库**

```sql
/* --创建数据库-- */
create database stuDB 
on  primary     -- 默认就属于primary文件组,可省略
(
/*--数据文件的具体描述--*/
    name='stuDB_data',              -- 主数据文件的逻辑名称
    filename='D:\stuDB_data.mdf',   -- 主数据文件的物理名称
    size=5mb,                       -- 主数据文件的初始大小
    maxsize=100mb,                  -- 主数据文件增长的最大值
    filegrowth=15%                  -- 主数据文件的增长率
)
log on
(
/*--日志文件的具体描述,各参数含义同上--*/
    name='stuDB_log',
    filename='D:\stuDB_log.ldf',
    size=2mb,
    filegrowth=1mb
)

/* --使用数据库-- */ 
use database stuDB

/* --删除数据库-- */ 
drop database stuDB
```

<br/><br/>

>## 表的创建、修改、删除

```sql
CREATE TABLE {表名}(
　　列名 数据类型 [列级完整性约束条件],
　　列名 数据类型 [列级完整性约束条件],
    ......
    [表级完整性约束条件]
)

--example:
create table stuMarks
(
    ExamNo      int     identity(1,1) primary key,
    stuNo       char(6) not null,
    writtenExam int     not null,
    LabExam     int     not null
)
```

完整性约束条件:
1. `not null` / `null`
2. default : 设置默认值，格式: `DEFAULT value`
3. primary key : 定义主码，保证惟一性和非空性
    列级： 列后 `primary key`
    表级： 最后 `primary key({列名}, {列名}, ...)`
4. unique :不允许列中出现重复的属性值，格式同3
5. foreign key :定义参照完整性 
    列级： 列后 `references 参照表名(主键名)`
    表级： 最后 `foreign key 列名 references 参照表名(主键名)`
6. check : 检查约束
    列级、表级： `check({约束表达条件式})`
    --所有约束前可加[constraint 约束名]，若不指定contraint的约束名，则会随机生成一个约束名

#### 系统数据类型：  [http://www.w3school.com.cn/sql/sql_datatypes.asp]

<br/>

### **修改表**

- 修改表名：`EXEC sp_rename {原表名}, {新表名}`
- 复制表
  - 复制整张表：`select * into {新表名} from {旧表名}`
  - 复制表结构：`select * into {新表名} from {旧表名} where 1=2`　　　/* --where 1=2 永远为假，所以什么都不选择，只复制了表结构-- */
  - 复制表内容：`insert into {新表名} select * from {旧表名}`
- 列操作
  - 增加字段：`alter table {表名} add {属性名} {属性类型} [列级约束条件]`
  - 修改字段名：`exec sp_rename '{表名.(字段原名)}','{字段新名}','column'`
  - 修改字段属性：`alter table {表名} alter column {字段名} {属性类型} [列级约束条件]`
  - 删除字段：`alter table {表名} drop column {字段名}`
- 约束操作
  - 已有字段添加完整性约束：`alter table {表名} add [constraint 约束名]` + 表级约束条件 
    ```sql
    alter table {表名} add [constraint 约束名] primary key(字段名)
    alter table {表名} add [constraint 约束名] unique(字段名)
    alter table {表名} add [constraint 约束名] foreign key (列名) references 参照表(列名)
    alter table {表名} add [constraint 约束名] check(约束表达条件式)
    --只有列级约束条件的default:
    alter table {表名} add constraint 约束名 DEFAULT(value) for {列名}
    ```
  - 删除字段约束：`alter table {表名} drop [constraint] {约束名}`
  - 查询字段约束：`select * from information_schema.constraint_column_usage where TABLE_NAME = '{表名}'`
  - 查看字段缺省约束表达式：`select * from information_schema.columns where TABLE_NAME = '{表名}'`

### **删除表**

- 删除整表：`drop table {表名}`

<br/><br/>

>## 数据的插入、修改、删除

- 数据插入：`insert into {表名}(field1,field2) values(value1,value2),(),()....`
- 数据修改：`update {表名} set 字段名=value [where条件]`
- 删除表数据
  - `delete from {表名} [where条件]`　　　/* --删除表中的一条或多条数据，也可以删除全部数据--*/
  - `truncate table {表名}`　　　 /* --删除表中的全部数据--*/

<br/><br/>

>## 数据查询

```sql
select {目标列组}
    from {数据源}
    [where {元组选择条件}]
    [group by {分列组} [having {组选择条件}]]
    [order by {排序列} [asc | desc]]
```
- 选择列
  - distinct：用于返回唯一不同的值
    - `select distinct {列名} from {表名}`
  - top：用于返回表前n项或前百分之n的行
    - `select top {value} [percent] {列名} from {表名}`
  - join
    ```sql
    -- 1.内连接(inner join)显示左右两表能完全匹配的数据
    select {表头} from 表A(B) inner join 表B(A) on A.键=B.键 [where条件]
    -- example:
    select z.职工号, z.仓库号, c.地址 from 职工表 z inner join 仓库表 c on z.仓库号=c.仓库号
    
    -- 2.左/右外连接(left/right outer join)显示左/右表所有数据，右/左表匹配不上的显示为NULL
    select {表头} from 表A left [outer] join 表B on A.键=B.键 [where条件]     --outer可省略
    
    -- 3.全外连接(full outer join)显示左右两量表所有数据，两表匹配不上的显示为NULL
    select {表头} from 表A full [outer] join 表B on A.键=B.键 [where条件]
    ```
  - union（并运算查询）
    - UNION 操作符用于合并两个或多个 SELECT 语句的结果集
    - UNION 内部的 SELECT 语句必须拥有相同数量的列，列也必须拥有相似的数据类型
    - UNION 结果集中的列名总是等于 UNION 中第一个 SELECT 语句中的列名
    - 默认地，UNION 操作符选取不同的值。如果允许重复的值，请使用 UNION ALL
      ```sql
      select 职工号 from 职工表
      union [all]
      select 职工号 from 仓库表
      ```
  - intersect（交运算查询）
    - 查询结果的交操作是指将同时属于两个或多个SELECT语句的查询结果作为总的查询结果输出。查询结果交操作的基本数据单位是行。
    ```sql
    SELECT {column_list}
    FROM {table_list}
    [WHERE {条件}]
    [INTERSECT {SELECT 语句} ... ]
    ```
  - except（差运算查询）
    - 查询结果的差操作是指从第一个SELECT语句的查询结果中去掉属于第二个SELECT语句查询结果的行作为总的查询输出结果。
    ```sql
    SELECT {column_list}
    FROM {table_list}
    [WHERE {条件}]
    [EXCEPT {SELECT 语句} ... ]
    ```

- where子句
  - like / not like （模糊查询）
    - % 包含零个或更多字符的任意字符串。
    - _（下划线） 任何单个字符。
    - \[\]指定范围（例如[a-f]）或集合（例如 [abcdef]）内的任何单个字符。
    - [^] 不在指定范围（例如[\^a-f]）或集合（例如[\^abcdef]）内的任何单个字符
    - `WHERE name LIKE '蔡%坤'`
  - [NOT] between and （范围比较）
    - `expression [NOT] BETWEEN expression1 AND expression2`
    - `WHERE 出生时间 NOT BETWEEN '1989-1-1' and '1989-12-31’`
  - IN / NOT IN：某列的某个值属于/不属于集合中的成员
    - `WHERE name IN (select ...)`
  - ANY / SOME：某列的值满足集合中的一个/某些值
    - <数据> $\theta$ ANY/SOME <集合>
    - `WHERE name = ANY (SELECT ...)` 
  - ALL：某列的值满足子查询中所有值的记录
    - <数据> $\theta$ ALL <集合>
    - `WHERE age > ALL (SELECT...)`
  - EXISTS / NOT EXISTS：存在一个值满足条件/不存在任何值满足条件
    - EXISTS(<集合>)
    - `WHERE EXISTS (SELECT...)`
  
<br/><br/>

>## 视图
- [https://www.cnblogs.com/Brambling/p/6731386.html]
- 创建/修改视图
  - `CREATE/ALTER VIEW {view_name} AS SELECT {column_names} FROM {table} [where条件]`
- 删除视图
  - `DROP VIEW {view_name}`

<br/><br/>

>## 游标
- 定义游标：
    ```sql
    DECLARE cursor_name CURSOR [ LOCAL | GLOBAL]
    [ FORWARD_ONLY | SCROLL ]
    [ STATIC | KEYSET | DYNAMIC | FAST_FORWARD ]
    [ READ_ONLY | SCROLL_LOCKS | OPTIMISTIC ]
    [ TYPE_WARNING ] 
    FOR <select_statement>
    [ FOR UPDATE [ OF column_name [,...n] ] ]
    ```
- 打开游标：`OPEN {{[GLOBAL] <游标名>} | <游标变量名>}`
- 利用游标读取数据：
    ```sql
    FETCH 
    [ 
      [ NEXT | PRIOR | FIRST | LAST 
        | ABSOLUTE { 行数 | @行数变量 }
        | RELATIVE { 行数 | @行数变量 }
      ]
      FROM
    ]
    { {[GLOBAL] cursor_name} | @cursor_variable_name }
    [ INTO @variable_name [ ,...n ]]
    ```
- 利用游标修改和删除数据：首先使用FETCH操作移动游标指针，使其指向要修改的行和要删除的行，然后利用UPDATE/DELETE语句并辅以`WHERE CURRENT OF <游标名>`子句进行操作。
- 关闭与删除游标：`CLOSE/DEALLOCATE {{[GLOBAL] <游标名>} | <游标变量名>}`

<br/><br/>

>## 索引
- 原理：[https://www.cnblogs.com/knowledgesea/p/3672099.html]
    ```sql
    CREATE [UNIQUE] [CLUSTERED|NONCLUSTERED] INDEX {index_name} 
    ON {table_name|view_name} (column [ASC|DESC] [ ,...n ])
    [with
      [PAD_INDEX]
      [[,]FILLFACTOR=fillfactor]
      [[,]IGNORE_DUP_KEY]
      [[,]DROP_EXISTING]
      [[,]STATISTICS_NORECOMPUTE]
      [[,]SORT_IN_TEMPDB]
    ]
    [ ON filegroup ]
    ```
- AD_INDEX：用于指定索引中间级中每个页（节点）上保持开放的空间。
- FILLFACTOR = fillfactor：用于指定在创建索引时，每个索引页的数据占索引页大小的百分比，fillfactor的值为1到100。
- IGNORE_DUP_KEY：用于控制当往包含于一个唯一聚集索引中的列中插入重复数据时SQL Server所作的反应。
- DROP_EXISTING：用于指定应删除并重新创建已命名的先前存在的聚集索引或者非聚集索引。
- STATISTICS_NORECOMPUTE：用于指定过期的索引统计不会自动重新计算。
- SORT_IN_TEMPDB：用于指定创建索引时的中间排序结果将存储在 tempdb 数据库中。
- ON filegroup：用于指定存放索引的文件组。