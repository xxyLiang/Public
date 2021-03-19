&emsp;&emsp;Transact-SQL（简称T-SQL）是SQL Server数据库管理系统使用的数据库语言，除了支持标准SQL语言的DDL、DML、DCL外，还拥有基本的程序设计能力，可以创建功能强大的批处理、存储过程、触发器与自定义函数。  
存储过程(Stored Procedure)是一组完成特定功能的T-SQL语句的集合。存储过程通常要预先编译好并存储在服务器上，由客户端应用程序、其他过程或触发器来调用执行。  

>## T-SQL基础
1. **脚本**：在SQL Server中，脚本是存储在文件中的一系列T-SQL命令语句，文件扩展名是sql。脚本能够将相应的T-SQL命令组织起来，实现一个完整的功能目标。脚本提供了分支、循环等控制语句，可以用来实现一些复杂的任务。脚本程序在执行时，需要解释器将命令翻译成机器指令。
2. **批处理**：批处理是指包含一条或多条T-SQL语句的集合，是送至SQL Server数据库引擎的执行单位。利用批处理机制，可以将一组T-SQL语句一起提交给SQL Server一次性执行。  
   批处理的格式为  
   ```sql
    T-SQL语句1
    T-SQL语句2
    ...
    T-SQL语句n
    GO
   ```
   其中，GO是一个命令，用于指定一个批处理的结束，以便在T-SQL脚本文件分割出一个或多个批处理。  
   需要注意的是，一些T-SQL语句一定需要独立称为一个批处理，不能和其他T-SQL命令一起执行，例如
   ```SQL
   CREATE DEFAULT, CREATE FUNCTION, CREATE PROCEDURE, CREATE RULE, CREATE TRIGGER, CREATE VIEW...
   ```
   换句话说，在这些命令后一定要加上GO命令。  
   当把一个或多个T-SQL语句组成的集合看作是一个批处理（文件）时，将一个或多个批处理（文件）组织到一起就可形成一个脚本，也即脚本是批处理的存在方式。  
3. **注释**：T-SQL语言提供了两种方式的注释
   ```sql
    1. --注释文本
    2. /* 注释文本 */
       或
       /* 注释文本1
          注释文本2
       */
   ```

<br/><br/>

>## T-SQL的语言要素
## **变量**
- 变量分类
  - 全局变量：由系统提供且预先声明，通过在名称前加两个“@”来区别于局部变量
  - 局部变量：用于保存单个数据值。
    - 当首字母为“@”时，表示该标识符为局部变量名；
    - 当首字母为“#”时，此标识符为一临时数据库对象名，若开头含一个“#”，表示局部临时数据库对象名；若开头含两个“#”，表示全局临时数据库对象名。
- 局部变量的使用
  - 定义：`DECLARE @variable_name type[=value], ...`
  - 赋值：`SET/SELECT @variable=expression`
  - 局部变量的寿命很短，查询结束后或使用`GO`后自动删除
- 局部游标变量
  - 定义：`DECLARE @cursor_variable_name CURSOR, ...`

<br/>

## **自定义数据类型**
- 一般数据类型定义：`CREATE TYPE {typename} FROM {base_type} [NULL / NOT NULL]`
- 表数据类型定义：`CREATE TYPE {typename} AS TABLE({列定义内容})`
- 删除：`DROP TYPE {typename}`  
<br/>

## **函数**
- 系统函数
  - 聚合函数  
    - <https://docs.microsoft.com/zh-cn/sql/t-sql/functions/aggregate-functions-transact-sql?view=sql-server-2017>
  - 日期和时间数据类型及函数
    - <https://docs.microsoft.com/zh-cn/sql/t-sql/functions/date-and-time-data-types-and-functions-transact-sql?view=sql-server-2017>
  - 字符串函数
    - <https://docs.microsoft.com/zh-cn/sql/t-sql/functions/string-functions-transact-sql?view=sql-server-2017>
  - 数学函数
    - <https://docs.microsoft.com/zh-cn/sql/t-sql/functions/mathematical-functions-transact-sql?view=sql-server-2017>
  - CAST函数：用于将某种数据类型的表达式的值，显式地转移为另一种数据类型的值。  
    `CAST( expression AS data_type )`
- 自定义函数
  - 自定义函数种类
    - 标量函数：返回一个确定类型的标量值
    - 单语句表值函数：返回单一Select语句查询结果的表
    - 多语句表值函数：返回由多条T-SQL命令语句所形成结果的表
  - 标量函数的创建
    ```sql
    CREATE FUNCTION [ owner_name. ] function_name
      ([{@parameter_name [AS] scalar_parameter_data_type [ = default ]} [, ...n]])  --自定义函数的参数
      RETURNS scalar_return_data_type   --返回值的数据类型
      [AS]
        BEGIN
          function_body
          RETURN scalar_expression
        END
    ```
  - 单语句表值函数的创建
    ```sql
    CREATE FUNCTION [ owner_name. ] function_name
      ([{@parameter_name [AS] scalar_parameter_data_type [ = default ]} [, ...n]])  --自定义函数的参数
      RETURNS TABLE   --返回一个表
      [WITH { ENCRYPTION|SCHEMABINDING }]
      [AS]
      RETURN (select sentence)
    ```
  - 多语句表值函数的创建
    ```sql
    CREATE FUNCTION [ owner_name. ] function_name
      ([{@parameter_name [AS] scalar_parameter_data_type [ = default ]} [, ...n]])  --自定义函数的参数
      RETURNS @local_variable TABLE   --@local_variable为T-SQL中的局部变量
      [AS]
        BEGIN
          function_body
          RETURN scalar_expression
        END
    ```

<br/><br/>

>## T-SQL流程控制语句
- BEGIN...END语句：可以将多条T-SQL语句组合成一个语句块，并将它们视为一条语句。
  ```sql
  BEGIN
  {
    <SQL语句> | <SQL语句块>
  }
  END
  ```
- IF...ELSE语句：用于判断当某一条件成立时执行某段程序，当该条件不成立时执行另一段程序。
  ```sql
  IF<逻辑表达式>
    <SQL语句1> | BEGIN <SQL语句块1> END
  [ELSE
    <SQL语句2> | BEGIN <SQL语句块2> END]
  ```
  注意：`IF @var = NULL`永远不成立，应写成`IF @var IS NULL`
- CASE语句：替换查询结果中的数据，可用于将定量资料转变为等级资料或定性资料；或实现多分支选择。
    ```sql
    select 职工号,工资等级=
  	case
        (when 条件 then 表达式)
  	    when 工资<1500 then 'low'
  	    when 工资>=1500 and 工资<2500 then 'middle'
  	    when 工资>=2500 then 'high'
        [else <结果表达式>]
  	end
    from 职工表
    或
    CASE
      WHEN <逻辑表达式> THEN <结果表达式>
      ...
    END
    ```
- WHILE语句
  ```sql
  WHILE <逻辑表达式>
  BEGIN
    <SQL语句1> | BEGIN <SQL语句块1> END
    [BREAK]
    <SQL语句2> | BEGIN <SQL语句块2> END
    [CONTINUE]
    <SQL语句3> | BEGIN <SQL语句块3> END
  END
  ```
- WAITFOR语句：延迟执行语句，通过指定某个时间或延迟某个时间间隔后，再执行其后的语句或存储过程。
  ```sql
  WAITFOR
  DELAY <'time'> | TIME <'time'>
  ```
- 其他语句
  - GO语句：表示一个批处理的结束。
  - GOTO语句
    ```sql
    <标号>:   --标号为字母数字串
      <SQL语句1> | BEGIN <SQL语句块1> END
    GOTO <标号>
    ```
  - RETURN语句：无条件地退出批处理、存储过程或触发器。
  - PRINT语句：向客户端返回用户定义消息。
    ```sql
    PRINT <@局部变量> | <字符串表达式>
    ```
  - EXECUTE语句：用于执行一个系统存储过程或用户定义的存储过程等。
    ```sql
    EXEC sq_help
    ```

<br/><br/>

>## 存储过程
&emsp;&emsp;为了完成控制访问权限管理、进行数据库审计追踪、实现关系数据库及其所有相关应用程序的数据定义语句与数据操作语句的分隔，以及完成其他一些具有特定功能的复杂工作，SQL Server提供了一种独立于数据表之外的称为存储过程(Stored-Procedure)的数据库对象。  
### **存储过程的功能**
1. 存储过程可以接受输入参数，并以输出参数的形式为调用过程或批处理返回多个值。
2. 存储过程包含由执行数据库操作的T-SQL编程语句，可以调用其他存储过程或嵌套调用。
3. 存储过程可以为调用过程或批处理返回一个状态值，以表示成功或失败，以及失败原因。  
<br/>
### **存储过程的优点**
1. 增强了代码的复用率和共享性。所有客户端可调用相同的存储过程来实现数据访问。
2. 提高数据库系统执行速度。存储过程只在创建时编译，以后每次执行存储过程都不需再重新编译，而批处理的T-SQL语句每次执行都需要编译。
3. 提高了系统安全性。不必给调用存储过程的每个用户授予被访问的存储过程引用的表或视图的权限，用户只要被授予了访问该存储过程的权限即可调用。
4. 具有处理复杂功能任务的能力。存储过程可以接受输入参数，并以输出参数的形式向用户返回表格或多个标量结果信息；为调用过程或批处理返回一个状态值，以表示成功或失败（及失败原因）。  
<br/>
### **存储过程的类型**
1. **系统存储过程**：是由系统提供的存储过程，主要用于从系统表中获取信息，从而为系统管理员管理SQL Server提供支持。系统存储过程被放在master数据库中，以sp_为前缀。
2. **用户定义的存储过程**：是用户为完成某一特定功能而创建的存储过程，它被存于用户创建的数据库中，存储过程名前不需要前缀sp_。  
   用户定义的存储过程有两种类型：一种是保存T-SQL语句集合的存储过程；另一种是CLR存储过程，该存储过程是对Microsoft .NET Framework公共语言运行时（CLR）方法的引用，可以接收和返回用户提供的参数。
3. **扩展存储过程**：是SQL Server可以动态装载和执行的动态链接库(DLL)。扩展存储过程的使用方法与系统存储过程一样。扩展存储过程只能添加到master数据库中，其前缀是xp_。
4. **临时存储过程**：与临时表相似，过程名称前面有前缀"#"的为本地临时存储过程，过程名称前面有前缀"##"的为全局临时存储过程。使用临时存储过程必须创建本地连接，当SQL Server关闭后，这些临时存储过程将自动被删除。
5. **远程存储过程**：是指从远程服务器上调用的存储过程。  
<br/>
### **存储过程语法**
```sql
-- 创建存储过程
CREATE { PROC | PROCEDURE } [schema_name.] procedure_name [ ; number] 	/*定义过程名*/
  [
    { @parameter data_type } 	/*定义参数的类型*/
    [ VARYING ] [ =default ] [ OUT | OUTPUT ] [READONLY]  /*定义参数的属性*/
  ]	[ ,...n ]
  [ WITH { RECOMPILE | ENCRYPTION | RECOMPILE, ENCRYPTION }] 	/*定义存储过程的处理方式*/
  [ FOR REPLICATION ] 
  AS sql_statement [;][ ...n ] 	        /*执行的操作*/
  [;]　

--执行存储过程
[ EXEC | EXECUTE ]
  {
    [ @return_status= ]
    procedure_name [;number] | @procedure_name_var
  }
  [
    [ @parameter= ] {value | @variable [OUTPUT] | [DEFAULT]}
  ]
  [, ...n]
  [WITH RECOMPILE]

--修改存储过程
将创建存储过程的CREATE改为ALTER即可

--删除存储过程
DROP PROCEDURE [IF EXISTS] db_name.sp_name
```  

### **函数与存储过程的区别**
1. 函数可作为查询语句的一个部分调用，可位于查询语句的`select`关键字或`from`关键字后面；存储过程一般是作为一个独立的部分来执行(EXEC执行)。
2. 存储过程可以返回多个参数，函数只能返回一个值或表对象。
3. 函数不能操作实体表，只能操作内建表。
4. 存储过程在创建时即在服务器上进行了编译，执行速度比函数快。