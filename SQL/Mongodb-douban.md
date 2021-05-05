## Mongodb
>### 基本命令
###1. 数据库操作
```cpp
// 创建数据库
use DATABASE_NAME

// 查看数据库
show dbs
show databases

// 删除数据库
db.dropDatabase()
```
###2. 集合操作
```cpp
// 创建集合
db.createCollection(name, options)
db.createCollection("movie")

// 查看集合
show collections

// 删除集合
db.COLLECTION_NAME.drop()    
```
###3. 文档基本CRUD
```cpp
// json格式的document
document = {
    "id": "123",
    "name": "apple",
    "height": 170
}
```
###3.1 插入文档
```cpp
db.COLLECTION_NAME.insert(document) // COLLECTION_NAME是集合实际名称，如movie
db.COLLECTION_NAME.insertOne(document)  // 插入单条文档，同上
db.COLLECTION_NAME.insertMany(document)     // 插入多条文档

db.collection.insertOne(
   <document>,
   {
      writeConcern: <document>
   }
)

db.collection.insertMany(
   [ <document 1> , <document 2>, ... ],
   {
      writeConcern: <document>,
      ordered: <boolean>
   }
)
```
参数说明
- `document`：要写入的文档。
- `writeConcern`：写入策略，默认为 1，即要求确认写操作，0 是不要求。
- `ordered`：指定是否按顺序写入，默认 true，按顺序写入。
&nbsp;

###3.2 查询文档
```cpp
db.COLLECTION_NAME.find(query, projection)
db.COLLECTION_NAME.find().pretty()  // pretty()格式化方式显示文档
```
参数说明
- `query` ：可选，使用查询操作符指定查询条件
- `projection` ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值，只需省略该参数即可（默认省略）。

example:
```cpp
// 查询id为123的记录，返回“name”，不返回默认自带的“_id”
db.movie.find({"id": "123"}, {"name": 1, "_id": 0})   
```
&nbsp;

###3.3 修改文档
```cpp
db.COLLECTION_NAME.update(
   <query>,
   <update>,
   {
        upsert: <boolean>,
        multi: <boolean>,
        writeConcern: <document>
   }
)

db.COLLECTION_NAME.updateMany()  // v3.2后的更新多条文档的方法

// save() 方法通过传入的文档来替换已有文档，_id 主键存在就更新，不存在就插入。
db.COLLECTION_NAME.save(
    <document>,
    {
        writeConcern: <document>
    }
)
```
参数说明
- `query` : update的查询条件，类似sql update查询内where后面的。
- `update` : update的对象和一些更新的操作符（如\$,\$set,\$inc...）等，也可以理解为sql update查询内set后面的
- `upsert` : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
- `multi` : 可选，mongodb默认是false，只更新找到的第一条记录，如果这个参数为true，就把按条件查出来多条记录全部更新。
- `writeConcern` :可选，抛出异常的级别。

example:
```cpp
db.movie.update({"id": "123"}, {"name": "pineapple"})   // 更新后，name以外的全部字段将消失
db.movie.update({"id": "123"}, {$set: {"name": "pineapple"}})    // 只更新name字段
```
&nbsp;

###3.4 删除文档
```cpp
db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)
```
参数说明
- `query` :（可选）删除的文档的条件。
- `justOne` : （可选）如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。
- `writeConcern` :（可选）抛出异常的级别。
&nbsp;


>### 豆瓣电影数据库实例
#### 数据
```python
{
    "movieId": "1292052",
    "movieName": "肖申克的救赎",
    "director": "弗兰克·德拉邦特",
    "actors": ["蒂姆·罗宾斯", "摩根·弗里曼", "鲍勃·冈顿", "威廉姆·赛德勒", "克兰西·布朗"],
    "genres": ["剧情", "犯罪"],
    "country": "美国",
    "releaseTime": ISODate('1994-10-14'),
    "length": 142,
    "rating": 9.7,
    "description": "一场谋杀案使银行家安迪（蒂姆•罗宾斯 Tim Robbins 饰）蒙冤入狱，谋杀妻子及其情人的指控将囚禁他终生。在肖申克监狱的首次现身就让监狱“大哥”瑞德（摩根•弗里曼 Morgan Freeman 饰）对他另眼相看。瑞德帮助他搞到一把石锤和一幅女明星海报，两人渐成患难之交。很快，安迪在监狱里大显其才，担当监狱图书管理员，并利用自己的金融知识帮助监狱官避税，引起了典狱长的注意，被招致麾下帮助典狱长洗黑钱。偶然一次，他得知一名新入狱的小偷能够作证帮他洗脱谋杀罪。燃起一丝希望的安迪找到了典狱长，希望他能帮自己翻案。阴险伪善的狱长假装答应安迪，背后却派人杀死小偷，让他唯一能合法出狱的希望泯灭。沮丧的安迪并没有绝望，在一个电闪雷鸣的风雨夜，一场暗藏几十年的越狱计划让他自我救赎，重获自由！老朋友瑞德在他的鼓舞和帮助下，也勇敢地奔向自由。本片获得1995年奥斯卡10项提名，以及金球奖、土星奖等多项提名。",
    "comments": [
        {
            "user": "犀牛", 
            "rating": NumberInt(5), 
            "text": "当年的奥斯卡颁奖礼上，被如日中天的《阿甘正传》掩盖了它的光彩，而随着时间的推移，这部电影在越来越多的人们心中的地位已超越了《阿甘》。每当现实令我疲惫得产生无力感，翻出这张碟，就重获力量。毫无疑问，本片位列男人必看的电影前三名！回顾那一段经典台词：“有的人的羽翼是如此光辉，即使世界上最黑暗的牢狱，也无法长久地将他围困！”"
        },
        {
            "user": "影志", 
            "rating": NumberInt(4), 
            "text": "Fear Can Hold You Prisoner, Hope Can Set You Free"
        },
        {
            "user": "veronique", 
            "rating": NumberInt(5), 
            "text": "一部没有爱情与美女的电影,却光芒四射"
        },
        {
            "user": "珍妮的肖像", 
            "rating": NumberInt(5), 
            "text": "没有人会不喜欢吧！书和电影都好。"
        },
        {
            "user": "私享史", 
            "rating": NumberInt(3), 
            "text": "因为1994年台湾引进了一部比较卖座的老片The Sting，被错译成了《刺激》。到了1995年本片上映时，片商觉得其剧情与《刺激》有类似的地方（大概都属于高智商的复仇？），因此被译成了《刺激1995》，1998年又有一部片子Return To Paradise因为含有牢狱情节，被译成《刺激1998》！"
        }
    ]
}

{
    "movieId": "1291546",
    "movieName": "霸王别姬",
    "director": "陈凯歌",
    "actors": ["张国荣", "张丰毅", "巩俐", "葛优", "英达"],
    "genres": ["剧情", "爱情", "同性"],
    "country": "中国",
    "releaseTime": ISODate('1993-07-26'),
    "length": 171,
    "rating": 9.6,
    "description": "段小楼（张丰毅）与程蝶衣（张国荣）是一对打小一起长大的师兄弟，两人一个演生，一个饰旦，一向配合天衣无缝，尤其一出《霸王别姬》，更是誉满京城，为此，两人约定合演一辈子《霸王别姬》。但两人对戏剧与人生关系的理解有本质不同，段小楼深知戏非人生，程蝶衣则是人戏不分。段小楼在认为该成家立业之时迎娶了名妓菊仙（巩俐），致使程蝶衣认定菊仙是可耻的第三者，使段小楼做了叛徒，自此，三人围绕一出《霸王别姬》生出的爱恨情仇战开始随着时代风云的变迁不断升级，终酿成悲剧。",
    "comments": [
        {
            "user": "phoebe", 
            "rating": NumberInt(5), 
            "text": "陈凯歌可以靠它吃两辈子饭了，现在看来江郎才尽也情有可原"
        },
        {
            "user": "JulyChan", 
            "rating": NumberInt(3), 
            "text": "你凝视你的脸，几亿人在爱恋。"
        },
        {
            "user": "趙小漁", 
            "rating": NumberInt(4), 
            "text": "凱歌也曾NB過，那時風華絕代的張國榮也還那麼年輕……"
        },
        {
            "user": "Sophie Z", 
            "rating": NumberInt(5), 
            "text": "那么好的国粹，连日本人都知道要护着，你们说烧就烧……大多数开始于民国间的故事，最难捱的都是那段时间。"
        },
        {
            "user": "同志亦凡人中文站", 
            "rating": NumberInt(5), 
            "text": "往事不要再提，人生已多风雨。他是霸王，你是虞姬，“我本是男儿郎，又不是女娇娥”，万丈红尘蹉跌走过半世纪。寥落繁华不由己，十万春花如梦里。剑还给你，命也还给你。“君王意气尽，贱妾何聊生？”陪你唱罢这出、我便离去..."
        }
    ]
}

{
    "movieId": "1292720",
    "movieName": "阿甘正传",
    "director": "罗伯特·泽米吉斯",
    "actors": ["汤姆·汉克斯", "罗宾·怀特", "加里·西尼斯", "麦凯尔泰·威廉逊", "莎莉·菲尔德"],
    "genres": ["剧情", "爱情"],
    "country": "美国",
    "releaseTime": ISODate('1994-07-06'),
    "length": 142,
    "rating": 9.5,
    "description": "阿甘（汤姆·汉克斯 饰）于二战结束后不久出生在美国南方阿拉巴马州一个闭塞的小镇，他先天弱智，智商只有75，然而他的妈妈是一个性格坚强的女性，她常常鼓励阿甘“傻人有傻福”，要他自强不息。阿甘像普通孩子一样上学，并且认识了一生的朋友和至爱珍妮（罗宾·莱特·潘 饰），在珍妮 和妈妈的爱护下，阿甘凭着上帝赐予的“飞毛腿”开始了一生不停的奔跑。阿甘成为橄榄球巨星、越战英雄、乒乓球外交使者、亿万富翁，但是，他始终忘不了珍妮，几次匆匆的相聚和离别，更是加深了阿甘的思念。有一天，阿甘收到珍妮的信，他们终于又要见面……",
    "comments": [
        {
            "user": "今天小熊不吃糖", 
            "rating": NumberInt(5), 
            "text": "羡慕珍妮，不管她多么叛逆、落魄、堕落，永远有阿甘在等她回来"
        },
        {
            "user": "影志", 
            "rating": NumberInt(5), 
            "text": "妈妈说，生活就像一盒巧克力……请不要再续下一句，耳朵听的起了茧子。"
        },
        {
            "user": "亚比煞", 
            "rating": NumberInt(5), 
            "text": "他的十二支船，每一支都是她的名字。她走后，他只得跑遍世界的每一个湖泊和沙漠来思念她，只等她一声召唤便死心塌地的回到她的身边。好莱坞编造一个这么纯粹的故事，让我们看到我们所拥有的感情，是多么的残破不堪。这简直是残忍的，不道德的。"
        },
        {
            "user": "陈毓秀", 
            "rating": NumberInt(5), 
            "text": "这部电影的主题是：“保守主义始终代表美国先进生产力的发展要求，始终代表美国先进文化的前进方向，始终代表美国最广大人民的根本利益。”"
        },
        {
            "user": "眠去", 
            "rating": NumberInt(4), 
            "text": "人生就像一盒巧克力，你不知道会选中哪一颗。"
        }
    ]
}
```

#### 数据查询
(1) 查询所有电影的id及名称
```cpp
> db.movie.find({}, {"_id": 0, "movieId": 1, "movieName": 1})
{ "movieId" : "1292052", "movieName" : "肖申克的救赎" }
{ "movieId" : "1291546", "movieName" : "霸王别姬" }
{ "movieId" : "1292720", "movieName" : "阿甘正传" }
```

(2) 查询评分高于9.5的电影的名称
```cpp
> db.movie.find({"rating": {$gt: 9.5}}, {"movieName":1})
{ "_id" : ObjectId("6092b6211217761d5d39d873"), "movieName" : "肖申克的救赎" }
{ "_id" : ObjectId("6092b62f1217761d5d39d874"), "movieName" : "霸王别姬" }
```

(3) 查询1994年以前上映的电影，输出其电影名称、上映时间
```cpp
> db.movie.find({"releaseTime": {$lt: ISODate("1994-01-01")}}, {"_id": 0, "movieName": 1, "releaseTime": 1})
{ "movieName" : "霸王别姬", "releaseTime" : ISODate("1993-07-26T00:00:00Z") }
```

(4) 查询电影《霸王别姬》的演员
```cpp
> db.movie.find({"movieName": "霸王别姬"}, {"_id": 0, "actors": 1})
{ "actors" : [ "张国荣", "张丰毅", "巩俐", "葛优", "英达" ] }
```

(5) 查询张国荣参演的电影的名称
```cpp
>  db.movie.find({"actors": "张国荣"}, {"_id": 0, "movieName": 1})
{ "movieName" : "霸王别姬" }
```

(6) 查询张国荣和葛优共同参演的电影
```cpp
> db.movie.find({"actors": {$all: ["张国荣", "葛优"]}}, {"_id": 0, "movieName": 1})
{ "movieName" : "霸王别姬" }
```

(7) 查询电影《阿甘正传》的短评
```cpp
> db.movie.find({"movieName": "阿甘正传"}, {"_id": 0, "comments": 1}).pretty()
{
    "comments" : [
        {
            "user" : "今天小熊不吃糖",
            "rating" : 5,
            "text" : "羡慕珍妮，不管她多么叛逆、落魄、堕落，永远有阿甘在等她回来"
        },
        {
            "user" : "影志",
            "rating" : 5,
            "text" : "妈妈说，生活就像一盒巧克力……请不要再续下一句，耳朵听的起了茧子。"
        },
        {
            "user" : "亚比煞",
            "rating" : 5,
            "text" : "他的十二支船，每一支都是她的名字。她走后，他只得跑遍世界的每一个湖泊和沙漠来思念她，只等她一声召唤便死心塌地的回到她的身边。好莱坞编造一个这么纯粹的故事，让我们看到我们所拥有的感情，是多么的残破不堪。这简直是残忍的，不道德的。"
        },
        {
            "user" : "陈毓秀",
            "rating" : 5,
            "text" : "这部电影的主题是：“保守主义始终代表美国先进生产力的发展要求，始终代表美国先进文化的前 进方向，始终代表美国最广大人民的根本利益。”"
        },
        {
            "user" : "眠去",
            "rating" : 4,
            "text" : "人生就像一盒巧克力，你不知道会选中哪一颗。"
        }
    ]
}
```

(8) 查询电影《肖申克的救赎》的短评评分
```cpp
> db.movie.find({"movieName": "肖申克的救赎"}, {"_id": 0, "comments.rating": 1})
{ "comments" : [ { "rating" : 5 }, { "rating" : 4 }, { "rating" : 5 }, { "rating" : 5 }, { "rating" : 3 } ] }
```
&nbsp;

#### 数据更新
(1) 修改电影《肖申克的救赎》的评分
```cpp
> db.movie.update({"movieName": "肖申克的救赎"}, {$set: {"rating": 9.8}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })  // 修改成功
> db.movie.find({"movieName": "肖申克的救赎"}, {"_id": 0, "rating": 1})
{ "rating" : 9.8 }
```

(2) 对电影《肖申克的救赎》增添新的字段
```cpp
> db.movie.update({"movieName": "肖申克的救赎"}, {$set: {"anotherName": "铁窗岁月"}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.movie.find({"movieName": "肖申克的救赎"}, {"_id": 0, "movieName": 1, "anotherName": 1})
{ "movieName" : "肖申克的救赎", "anotherName" : "铁窗岁月" }
```

(3) 对电影《肖申克的救赎》新增演员
```cpp
> db.movie.update({"movieName": "肖申克的救赎"}, {$push: {"actors": "吉尔·贝罗斯"}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.movie.find({"movieName": "肖申克的救赎"}, {"_id": 0, "actors": 1})
{ "actors" : [ "蒂姆·罗宾斯", "摩根·弗里曼", "鲍勃·冈顿", "威廉姆·赛德勒", "克兰西·布朗", "吉尔·贝罗斯" ] }
// 新增的演员“吉尔·贝罗斯”被放到数组的最后
```
