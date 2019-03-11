>## 数据库的创建、删除
### 创建数据库

```sql
/* --创建数据库-- */
create database stuDB 
on  primary     -- 默认就属于primary文件组,可省略
(
/*--数据文件的具体描述--*/
    name='stuDB_data',              -- 主数据文件的逻辑名称
    filename='D:\stuDB_data.mdf',   -- 主数据文件的物理名称
    size=5mb,                       --主数据文件的初始大小
    maxsize=100mb,                  -- 主数据文件增长的最大值
    filegrowth=15%                  --主数据文件的增长率
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
### 创建表

```sql
CREATE TABLE 〈表名〉(
　　列名 数据类型 <列级完整性约束条件>,
　　列名 数据类型 <列级完整性约束条件>,
    ......
    <表级完整性约束条件>
)

--example:
create table stuMarks
(
    ExamNo      int     identity(1,1) primary key,
    stuNo       char(6) not null,
    writtenExam int     not null,
    LabExam     int     not null
)


完整性约束条件:
1. not null / null
2. default : 默认值，格式 default 约束名 <value>
3. primary key : 定义主码，保证惟一性和非空性
    列级： 列后 primary key
    表级： 最后 primary key(<列名>, <列名>, ...)
4. unique :不允许列中出现重复的属性值，格式同3
5. foreign key :定义参照完整性      --TODO
6. check : 检查约束
    列级表级：[constraint 约束名] check(<约束表达条件式>)
    --若不指定contraint的约束名，则会随机生成一个约束名
```

### 修改表
- 修改表名：`EXEC sp_rename <原表名>, <新表名>`
- 复制表
    - 复制整张表：`select * into <新表名> from <旧表名>`
    - 复制表结构：`select * into <新表名> from <旧表名> where 1=2`　　　/* --where 1=2 永远为假，所以什么都不选择，只复制了表结构-- */
    - 复制表内容：`insert into <新表名> select * from <旧表名>`
- 列操作
    - 增加字段：`alter table <表名> add <属性名> <属性类型> <列级约束条件>`
    - 修改字段名：`exec sp_rename '表名.[字段原名]','字段新名','column'`
    - 修改字段属性：`alter table <表名> alter column <字段名> <属性类型> <列级约束条件>`
    - 删除字段：`alter table <表名> drop column <字段名>`
- 约束操作
    - 添加字段约束：`alter table <表名> add [constraint 约束名] primary key(字段名)`
    - 删除字段约束：`alter table <表名> drop [constraint] <约束名>`
    - 查询字段约束：`select * from information_schema.constraint_column_usage where TABLE_NAME = '表名'`
    - 查看字段缺省约束表达式：`select * from information_schema.columns where TABLE_NAME = '表名'`

### 删除表
- 删除整表：`drop table <表名>`


<br/><br/>
>## 数据的插入、修改、删除
- 数据插入：`insert into <表名>(field1,field2) values(value1,value2)`
- 数据修改：`update <表名> set 字段名=value [where条件]`
- 删除表数据
    - `delete from <表名> [where条件]`　　　/* --删除表中的一条或多条数据，也可以删除全部数据--*/
    - `truncate table <表名>`　　　/* --删除表中的全部数据--*/
    - delete删除表数据后，标识字段不能复用。也就是说如果你把id=10（假如id是标识字段）的那行数据删除了，你也不可能再插入一条数据让id=10
    - truncate删除表数据后，标识重新恢复初始状态。默认为初始值为1，也就是说，truncate之后，再插入一条数据，id=1
