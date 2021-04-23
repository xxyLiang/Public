```python
from lxml import etree

tree = etree.parse('example.xml')

def s(a):
    for i in a:
        print(etree.tostring(i, encoding='utf-8').decode())


a = tree.xpath('/bookstore')
a = tree.xpath('/bookstore/book')
a = tree.xpath('//book')
a = tree.xpath('/bookstore/book/title')
a = tree.xpath('/bookstore/book/title/text()')
a = tree.xpath('/bookstore/book/title/@lang')

a = tree.xpath('/bookstore/book[1]')
a = tree.xpath('/bookstore/book[2]/author')
a = tree.xpath('/bookstore/book[last()]')
a = tree.xpath('/bookstore/book[price<30]')
a = tree.xpath('/bookstore/book/title[@lang="cn"]')

a = tree.xpath('//title[@lang="cn"]/following::*[1]')
a = tree.xpath('//title[@lang="cn"]/../preceding-sibling::book[1]')
a = tree.xpath('//title[@lang="cn"]/../preceding-sibling::book[2]/price/text()')
a = tree.xpath('//title[@lang="eng"]/../following-sibling::book[1]')

```

http://www.sqlfiddle.com/#!18

```sql
CREATE TABLE TEST(
    tid int,
    xmlDoc xml
);

insert into test values(
    1,
    '<bookstore>
    <book>
        <title lang="eng">Harry Potter</title>
        <author>J. K. Rowling</author>
        <price>29.99</price>
    </book>
    <book>
        <title lang="eng">Jane Eyre</title>
        <author>Charlotte Brontë</author>
        <price>39.95</price>
    </book>
    <book>
        <title lang="cn">平凡的世界</title>
        <author>路遥</author>
        <price>25.8</price>
    </book>
</bookstore>'
);

select xmlDoc.query('/bookstore/book[1]')
from test;

select xmlDoc.query('
    for $x in /bookstore/book 
    where $x/price<30 
    order by $x
    return $x/title/text()
') as Result from test;

```
