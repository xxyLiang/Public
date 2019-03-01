>## 数据库的创建、删除
### 创建数据库

```sql
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
```

### 删除数据库

```sql
use master -- 设置当前数据库为master,以便访问sysdatabases表
go
if exists(select * from sysdatabases where name='stuDB')
drop database stuDB
go
```
<br/><br/>
>## 表的创建、修改、删除
### 创建

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
