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
CREATE [TEMPORARY] TABLE [IF NOT EXISTS] tbl_name
(
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
    LabExam     int     not null,
    FOREIGN KEY ExamNo REFERENCES exam_info(ExamNo)
)
```

完整性约束条件:
1. `NOT NULL` / `NULL` (不声明则默认`NULL`)

2. `DEFAULT` : 设置默认值，格式 `DEFAULT value`

3. `AUTO_INCREMENT`：自增属性，只有整型字段能设置

3. `PRIMARY KEY` : 定义主码，保证惟一性和非空性，一个表只能有一个，但可以联合多个字段形成复合主键。
    列级： 列后 `primary key`；
    表级： 最后 `primary key({列名}, {列名}, ...)`
    
5. `UNIQUE` :不允许列中出现重复的属性值，格式同3

5. `FOREIGN KEY` ：定义参照完整性。
    列级： 列后 `references 参照表名(主键名)`；
    表级： 最后 `foreign key 列名 references 参照表名(主键名)`
    
6. `CHECK` : 检查约束。
    列级、表级： `check({约束表达条件式})`；
    
    所有约束前可加`constraint 约束名`，若不指定contraint的约束名，则会随机生成一个约束名

#### [系统数据类型](http://www.w3school.com.cn/sql/sql_datatypes.asp)



### **修改表**

- 修改表名：`ALTER TABLE 旧表名 rename 新表名`

- 复制表
  - 复制整张表：`select * into 新表 from 旧表`
  - 复制表结构：`select * into {新表名} from {旧表名} where 1=2`　　　/* --where 1=2 永远为假，所以什么都不选择，只复制了表结构-- */
  - 复制表内容：`insert into {新表名} select * from {旧表名}`
  
- 列操作
  - 增加字段：`ALTER table 表名 ADD COLUMN 字段 字段类型 [列级约束条件] [AFTER 字段]`
  - 修改字段名及属性：`ALTER TABLE 表名 CHANGE 旧字段 新字段 字段类型 [列级约束条件]  `
  - 删除字段：`ALTER TABLE 表名 DROP COLUMN 字段`
  
- 约束操作
  - 已有字段添加完整性约束：`ALTER TABLE 表名 ADD [constraint 约束名]` + 表级约束条件 
    ```sql
    ALTER TABLE 表名 ADD [CONSTRAINT 约束名] PRIMARY KEY (字段)
    ALTER TABLE 表名 ADD [CONSTRAINT 约束名] UNIQUE (字段)
    ALTER TABLE 表名 ADD [CONSTRAINT 约束名] FOREIGN KEY (字段) REFERENCES 参照表(字段)
    ALTER TABLE 表名 ADD [CONSTRAINT 约束名] CHECK (约束表达条件式)
    --只有列级约束条件的default:
    ALTER TABLE 表名 ADD [CONSTRAINT 约束名] DEFAULT(value) FOR 字段
    ```
  - 删除字段约束：`alter table 表名 drop constraint 约束名`
  - 查询字段约束：`select * from information_schema.constraint_column_usage where TABLE_NAME = '{表名}'`
  - 查看字段缺省约束表达式：`select * from information_schema.columns where TABLE_NAME = '{表名}'`

### **删除表**

- 删除整表：`DROP TABLE 表名`





>## 数据的插入、修改、删除

- 数据插入：

  ```sql
  INSERT [INTO] 表名[(field1, field2)] VALUES(value1, value2)[,(...),(...),...]
  INSERT [INTO] 表名 SET field1=expr1, field2=expr2, ..., fieldN=exprN
  INSERT [INTO] 表名[(A_field1, A_field2)] SELECT B_field1, B_field2 from ...
  ```

- 数据修改：`update {表名} set 字段名=value [where条件]`

- 删除表数据
  
  ```sql
  # 单表删除
  DELETE FROM tbl_name 
  [WHERE where_definition]
  [ORDER BY ...] 
  [LIMIT row_count]
  
  # 多表删除
  DELETE tbl_name [, tbl_name ...] 
  FROM table_references
  [WHERE where_definition]
  -- 或：
  DELETE FROM tbl_name [, tbl_name ...] 
  USING table_references
  [WHERE where_definition]
  -- 例如：
  DELETE t1 FROM table1 AS t1, table2 AS t2 WHERE t1.id=t2.id	 -- 删除表t1中id出现在表t2中的记录，t2不会被删除
  
  # 清空表
  TRUNCATE TABLE tbl_name
  ```





>## 数据查询 SELECT

```sql
SELECT {目标列组}
    from {数据源}
    [where {元组选择条件}]
    [group by {分列组} [having {组选择条件}]]
    [order by {排序列} [asc | desc]]
    
-- 完整的SELECT语法
SELECT 
	[ALL | DISTINCT | DISTINCTROW]
	SELECT_expr, ...
	[INTO OUTFILE 'file_name' export_options | INTO DUMPFILE 'file_name']
  [FROM table_name
	[WHERE where_definition]
	[GROUP BY {col_name | expr | position} [ASC | DESC], ... [WITH ROLLUP]]
    [HAVING where_definition]
    [ORDER BY {col_name | expr | position} [ASC | DESC], ...]
    [LIMIT {[offSET,] row_count | row_count OFFSET offSET}]
    [PROCEDURE procedure_name(argument_list)]
    [FOR UPDATE | LOCK IN SHARE MODE]
  ]
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
    - `WHERE name LIKE '蔡%坤' [ESCAPE '/']`
    - % 包含零个或更多字符的任意字符串。
    - _（下划线） 任何单个字符。
    - \[\]指定范围（例如[a-f]）或集合（例如 [abcdef]）内的任何单个字符。
    - [^] 不在指定范围（例如[\^a-f]）或集合（例如[\^abcdef]）内的任何单个字符
    - `ESCAPE`是转义，例如上面表示使用'/'替代'%'进行匹配
    
  - 正则匹配
  
    ```sql
    SELECT col FROM tbl WHERE col regexp '^B[an]+a$'  -- 表示检索col以B开头、a结尾、中间一或多个an的记录
    SELECT col FROM tbl WHERE col regexp 'Ba{2,10}' -- 表示检索col包含”Baaa(2~10个a)“的记录
    ```
  
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
  
- 条件/流程控制

  - `IF(condition, if_true, if_false)`

  - `IFNULL(expr1, expr2)` 若expr1为NULL，则返回expr2，否则返回expr1。

  - `CASE WHEN`：

    ```sql
    CASE 
    WHEN condition1 THEN result1
    [WHEN condition2 THEN result2
    ...
    ELSE resultN]
    END
    ```

  - `CASE value`：

    ```sql
    CASE value_name
    WHEN value1 THEN result1
    [WHEN value2 Then result2
    ...
    ELSE result N]
    END
    ```

- `LIMIT [m,] n` ：表示从m+1行开始检索n条记录





> ## MySQL内置函数

```sql
#1 字符串处理函数
#1.1 字符串编码相关
ASCII(str)  					-- 返回字符串的第一个字符的ASC码值 （0~255）
ORD(str)						-- 返回多字节字符串的第一个字符的ASC码值 （即可计算汉字的ASC）
CHAR(N, ...)  					-- 将整数值转换为字符串，如CHAR(77, 121, 83, 81, '76') 返回'MySQL'
LENGTH(str)						-- 取字符串长度，一个汉字算2个字节
CHAR_LENGTH(str)				-- 取字符串长度，一个汉字算1个字节

#1.2 字符串选择与搜索
LEFT(str, len) / RIGHT(str, len)				-- 从左边/右边取子字符串，即str[:len] / str[-len:]
MID(str,pos,len) / SUBSTR(str,pos[,len])		-- 从中间取子字符串，返回str[pos:pos+len]
INSTR(str, substr)				-- 子字符串第一次出现位置(find)
LOCATE（substr,str[,pos])		-- 子字符串第一次出现的位置，如带pos，从起始位置pos开始算起，即从str[pos:]中搜索

#1.3 字符串替换
INSERT(str, pos, len, newstr)	-- 返回将str的pos~pos+len字符替换为newstr的字符串，pos从1开始计算
REPLACE(str,from_str,to_str)	-- 将字符串替换，如将所有'abc'替换为'cba'
LPAD(str,len,padstr) / RPAD(str,len,padstr)			-- 填充，其左边/右边由字符串padstr填补到len字符长度
TRIM([{BOTH|LEADING|TRAILING} [remstr] FROM] str)	-- 去掉左右/仅左/仅右侧的remstr字符串，默认为BOTH和空格
LTRIM(str) / RTRIM(str)			-- 去掉左侧/右侧空格
LCASE(str) / LOWER(str)			-- 转小写
UCASE(str) / UPPER(str)			-- 转大写
REVERSE(str)					-- 字符串顺序取反

#1.4 字符串拼接与生成
REPEAT(str, count)				-- 将字符串重复若干次
CONCAT(str1, str2, ...)			-- 字符串拼接
SPACE(N)						-- 返回若干个空格

#1.5 其他
ELT(N, str1, str2, str3, ...)		-- 返回指定位置的字符串，如N=2返回str2
FIELD(str, str1, str2, str3, ...)  	-- 返回str在列表中的序号（和ELT相对应）
STRCMP(expr1, expr2)				-- 比较字符串大小，expr1 <=> expr2 分别返回-1,0,1


#2 数学函数
ABS(X)							-- 取绝对值
CEILING(X)						-- 向上取整，即返回不小于X的最小整数
FLOOR(X)						-- 向下取整，即返回不大于X的最大整数
ROUND(X)						-- 四舍五入取整
MOD(N, M)						-- 取余数，相当于N % M
SQRT(X)							-- 开方
EXP(X)
LOG(B,X)						-- B默认为e
LN(X) LOG2(X) LOG10(X)
POW(X, Y)
RAND(N)							-- 返回[0,1]的随机数，整数N是种子值，常用于ORDER BY RAND()
FORMAT(X, D)					-- 四舍五入保留小数点后D位，不足则补全，返回字符串
TRUNCATE(X, D)					-- 直接舍去小数点后D位，D可为负数，返回数字


#3 返回最大/最小的参数值
GREATEST(value1, value2, ...)  # 如果全部为NULL则返回NULL
LEAST(value1, value2, ...)	# 如果存在NULL则返回NULL
# MAX MIN是返回列中最大/小的值，GREATEST LEAST是返回行中最大/小的字段的值

#4 返回列表中第一个非NULL值
COALESCE(NULL, 3, NULL, 4) -- 3
COALESCE(NULL, NULL)  -- NULL
COALESCE(1,2,3)  -- TRUE

#5 类型转换
CAST(expr AS type)	-- 转字符type为'CHAR'，整数为'SIGNED'或'UNSIGNED'

#6 分段函数
INTERVAL(N, N1, N2, N3, ...)
# 对于N1<N2<N3<...<Nn的数据，返回满足N<Nm的最小m值。例如，INTERVAL(percent, 25, 50, 75)用于返回percent所在四分位区间，当percent=10,返回0；percent=30，返回1；percent=76，返回3.
```



> ## 窗口函数

```sql
# 第一种表达
func(args, ...) OVER([partition-by-clause] [order-by-clause] [windowing-clause])
# 第二种表达
func(args, ...) OVER w
FROM ... [WHERE ...]
	window w as ([partition-by-clause] [order-by-clause] [windowing-clause])
	[LIMIT ...]

-- 其中，windowing-cluase为
rows between <start expr> and [end expr]
<start expr> is [unbounded preceding | current row | n preceding | n following]
<end expr> is [unbounded preceding | current row | n preceding | n following]

# 例如
SELECT 
	tid,
	replies, 
	sum(replies) OVER(order by tid rows between 1 preceding and current row) as total
	FROM `threads` where CAST(tid as UNSIGNED) BETWEEN 1000003 and 1000020 limit 5
# or
SELECT 
	tid,
	replies, 
	sum(replies) OVER w as total
	FROM `threads` where CAST(tid as UNSIGNED) BETWEEN 1000003 and 1000020
	window w as (order by tid rows between 1 preceding and current row)
	LIMIT 5
```

注意：选择top-N时不能直接`where ranking<N`，因为where在窗口函数前执行，在where执行时并没有ranking字段

```sql
#查询每个学生成绩最高的两个科目
SELECT * FROM 
	(SELECT 
     姓名, 
     科目,
     rank() over (PARTITION BY 姓名 ORDER BY 成绩 DESC) AS ranking 
     FROM score) AS t
WHERE ranking<=2

# 而不能
SELECT 
	姓名, 
	科目,
	rank() over (PARTITION BY 姓名 ORDER BY 成绩 DESC) AS ranking 
	FROM score WHERE ranking<=2
```



专用窗口函数：

- 排名相关
  - `row_number()`：对行进行排序并为每一行增加一个唯一编号。这是一个非确定性函数。
  - `rank()`：将数据行值按照排序后的顺序进行排名，在有并列的情况下排名值将被跳过。
  - `dense_rank()`：将数据行值按照排序后的顺序进行排名，在有并列的情况下也不跳过排名值。
  - `percent_rank()`：将计算得到的排名值标准化，值为 (rank-1) / (rows-1)。
  - `cume_dist()`：将计算得到的排名值标准化，值为小于等于当前值的行数累积分布。
  - `ntile(N)`：将分区（partition）分为N组，向每行分配组号。
- 选择相关
  - `first_value(val)`：返回该窗口第一行的val值（val可以是一个表达式，下同）。
  - `last_value(val)`：返回该窗口最后一行的val值。
  - `nth_value(val, N)`：返回该窗口第N行的val值
  - `lag(val, N, default)`：返回该窗口当前行**之前**第N行的val值，如果没有则返回default值，N和default的缺省值分别为1和NULL。
  - `lead(val, N, default)`：返回该窗口当前行**之后**第N行的val值。

排名相关窗口函数受partition by控制，选择相关窗口函数和聚合函数受窗口控制（rows between优先）。



>## 视图
- [视图的详细介绍](https://www.cnblogs.com/Brambling/p/6731386.html)
- 创建/修改视图
  - `CREATE/ALTER VIEW {view_name} AS SELECT {column_names} FROM {table} [where条件]`
- 删除视图
  - `DROP VIEW {view_name}`



> ## 存储过程

```sql
DROP PROCEDURE IF EXISTS math;
delimiter $		# 更改定界符
CREATE PROCEDURE math(IN a INT, IN b Int)
BEGIN
	set @var1 = 1;
	set @var2 = 2;
	SELECT @sum:=(a+b) AS sum, @dif:=(a-b) AS dif;		-- 在SELECT中只能使用:=赋值，SET中可使用=和:=
END;
$
delimiter ;

# 一些适用于存储过程的语句
while condition_ do
...
end while	-- end后面需加语句类型

loop
...
end loop

repeat
...
until condition_
end repeat
```





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





>## 索引
- [原理](https://www.cnblogs.com/knowledgesea/p/3672099.html)
  
    ```sql
    CREATE [UNIQUE] [CLUSTERED|NONCLUSTERED] INDEX {index_name} 
    ON {table_name|view_name} (column[(lenghth)] [ASC|DESC] [ ,...n ])
    [with
      [PAD_INDEX]
      [[,]FILLFACTOR=fillfactor]
      [[,]IGNORE_DUP_KEY]
      [[,]DROP_EXISTING]
      [[,]STATISTICS_NORECOMPUTE]
      [[,]SORT_IN_TEMPDB]
    ]
    [ ON filegroup ]
    
    
    -- 也可以使用ALTER
    ALTER TABLE 表名 ADD UNIQUE [index_name] on (columns(length))
    
    -- 删除
    ALTER TABLE 表名 DROP INDEX index_name
    ```
    
- AD_INDEX：用于指定索引中间级中每个页（节点）上保持开放的空间。

- FILLFACTOR = fillfactor：用于指定在创建索引时，每个索引页的数据占索引页大小的百分比，fillfactor的值为1到100。

- IGNORE_DUP_KEY：用于控制当往包含于一个唯一聚集索引中的列中插入重复数据时SQL Server所作的反应。

- DROP_EXISTING：用于指定应删除并重新创建已命名的先前存在的聚集索引或者非聚集索引。

- STATISTICS_NORECOMPUTE：用于指定过期的索引统计不会自动重新计算。

- SORT_IN_TEMPDB：用于指定创建索引时的中间排序结果将存储在 tempdb 数据库中。

- ON filegroup：用于指定存放索引的文件组。

