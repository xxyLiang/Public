## 面向对象的数据库

- 对象
  - 类的实例
- 类
  - 具有相同或相似性质的对象的抽象就是类
- 封装、继承和多态性
  - 多态性：就是多种表现形式，“一个对外的接口，多个内在实现方法。”


### Object Identity

- OO数据库系统为每个存储在数据库中的独立对象提供一个唯一标识。
- 典型的唯一标识是一个唯一的、有系统生产的对象标识符（OID）。
- OID值对外部用户是不可见的，但可以指定给适当类型的程序变量。
- OID的特性：永远不变性、每个OID只被使用一次。


[OODB排名](https://db-engines.com/en/ranking/object+oriented+dbms)
<br/>

### postgreSQL语法
>#### 数据类型
```sql
# 定义数据类型
CREATE TYPE MyDate AS(
  day integer,
  month char(10),
  year integer
);
CREATE TYPE CourseGrade AS(
  course varchar(100),
  grade integer,
  date MyDate
);

# 创建表
CREATE TABLE sc(
  name varchar(100),
  cg CourseGrade[]
);

# 插入数据（两种方式）
INSERT INTO sc VALUES(
  'Jenny', 
  '{"(\"math\", 1, \"(1, \"January\", 2021)\")", "(\"english\", 1, \"(2, \"March\", 2021)\")"}');
INSERT INTO sc VALUES(
  'Peter', 
  ARRAY[
    CAST (ROW('chinese', 2, ROW(28, 'April', 2021)) AS CourseGrade),
    CAST (ROW('internal medicine', 2, ROW(4, 'May', 2021)) AS CourseGrade)
    # CAST (oldtype AS newtype)
  ]
);

select (cg[1]).date.* from sc where name='Jenny';
```
<br/>

>### 继承
```sql 
CREATE TABLE person (
  id  int, 
  name varchar(20)
);

CREATE TABLE student (
  classId  int
)INHERITS(person);
```
<br/>

### Oracle

电影数据库涉及如下数据：电影类包括电影名、制作年份、电影长度等属性；演员类包括姓名、年龄、地址等属性。每部电影都可能有多个演员出演，而每个演员都可能出演多部电影。
1. 用ODL给出类的说明
2. 用OQL查询演员张晓丽所出演的电影的电影名和制作年份。

```sql
CREATE TYPE Addresss AS object(
  province varchar(20),
  city varchar(20),
  street varchar(30)
);

CREATE TYPE char_list is TABLE of varchar(100);

CREATE OR REPLACE TYPE person force AS object(
  pid integer,
  pname varchar(100),
	age integer,
	Address Addresss,
  MEMBER FUNCTION get_id RETURN integer
);
CREATE OR REPLACE TYPE BODY person as 
MEMBER FUNCTION get_id RETURN integer IS
BEGIN
  return pid;
END;
END;

CREATE TABLE persons of person;

CREATE OR REPLACE TYPE Movie as object(
  mid integer,
  mname varchar(100),
  myear integer,
  MovieLength integer,
  Actors char_list,
  MEMBER FUNCTION get_length RETURN integer
) ;

CREATE OR REPLACE TYPE BODY Movie as 
MEMBER FUNCTION get_length RETURN integer is
BEGIN 
  RETURN MovieLength;
END;
END;

CREATE TABLE movies of Movie NESTED TABLE Actors STORE AS Actors1;

insert into persons values
(1, '小李子', 30, Addresss('hubei', 'wuhan', 'changjianglu'));
insert into persons values
(2, '张晓丽', 31, Addresss('hubei', 'wuhan', 'changjianglu'));
insert into persons values
(3, '丽丽', 33, Addresss('hubei', 'wuhan', 'changjianglu'));
insert into persons values
(4, '莉莉', 34, Addresss('hubei', 'wuhan', 'changjianglu'));
insert into persons values
(5, '李丽', 32, Addresss('hubei', 'wuhan', 'changjianglu'));

insert into Movies values(
	1,
  'movie1',
  2019,
  101,
  char_list('张晓丽', '丽丽')
) 

select t.mname, t.MovieLength from movies t, table(t.Actors) tt where tt.column_value in ('张晓丽')
```

