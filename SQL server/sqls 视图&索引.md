>## 视图
- [https://www.cnblogs.com/Brambling/p/6731386.html]
- 创建/修改视图
  - `CREATE/ALTER VIEW {view_name} AS SELECT {column_names} FROM {table} [where条件]`
- 删除视图
  - `DROP VIEW {view_name}`

<br/>

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