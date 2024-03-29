>### 子类、超类和继承

- 类是一些实体的集合或汇集。
- 子类S是这样一个类，其实体集必须总是“另一个类”实体集的子集。
- 被继承的类一般称为“超类”，也有叫做父类。

#### 属性
- 子类的成员必须是超类的成员
- 子类成员的实体继承了超类实体的所有属性，以及超类参与的所有联系。
- 如果子类还具有子集专有属性和联系，就可以被认为是一个独立的实体类型

*Q: 什么是“弱实体”？*
<br/>

>### 特化和泛化
- 特化就是定义子类中独特的属性
- 泛化就是将各子类中的共同属性抽取出来，构成一个超类

约束：
不相交约束：父类中的一个实体不能同时属于多个子类中的实体集（职业类型不能同时是“秘书”和“工程师”）
完备性约束：

**插入和删除规则**
- 从超类删除一个实体隐含着该实体被自动从隶属的所有子类中删除。
- 向超类中插入一个实体隐含着该实体被强制插入到定义的所有子类中。

特化层次：每个层次只有一个父类

共享子类：拥有多于一个超类的子类
