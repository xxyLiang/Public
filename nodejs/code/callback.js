// 如果需要获取一个函数中异步操作的结果，必须通过回调函数来获取

function add(x, y, callback) {
    // var callback = function(data) {console.log(data);}

    setTimeout(function (){
        var result = x + y;
        callback(result);
    }, 1000)
}

fn(10, 20, function (data) {
    console.log(data);
})


// 异步主要用在读写文件、ajax中
// 其实读取文件的函数就用到了回调
function readFile(path, callback) {
    var err = null;
    var data = read(path);
    callback(err, data);
}

readFile('a.txt', function(err, data) {
    if(err) {
        throw err;
    }
    console.log(data);
})
