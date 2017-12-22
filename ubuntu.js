
var common = require("./common")
var cheerio = require('cheerio');
var logger = require('./logger');
var config = require('./config')
var mysql=require("./mysql")
var fs = require('fs')
var url = config.ubuntu_url;
//第一次搜索的表单


var page = 1;
var maxPage = 28;
var articleID = 0;
//分页链接的表单数据


//mongodb数据库collection，存放抓取的papers
var paperCollection

// exports.getArticles = function (collection) {
//     paperCollection = collection;
//     mongo.init((err) => {
//         if (err) throw err;
//         getArticlesUrl(1);
//     });
// }


var getAll = function () {

    common.get(url, null, function (err, data) {
        if (err) throw err;

        var arrayValue = new Array();
        var arrayText = new Array();
        var $ = cheerio.load(data, { decodeEntities: false });

        $("select option").each(function () {
            var value = $(this).val();
            var text = $(this).text();
            arrayValue.push(value);
            arrayText.push(trim(text));
        });
        //选取select有两个一样的，第一个option为空
        //从arra中选取1到length/2作为版本信息
        arrayValue = arrayValue.slice(1, arrayValue.length / 2);
        arrayText = arrayText.slice(1, arrayText.length / 2);

        // for(var i =0; i<arrayText.length; i++){
        //     logger.log(i);
        //     logger.log(arrayText[i]);
        // }


        getSingleVersionInfo(arrayValue[1], arrayText[1], 0);








        // var cards = $('.tbb');
        // cards.each(function (i) {
        //     articleID = articleID + 1;
        //     var url = $(this).find('a').attr('href')
        //     articleURLArray.push({ id: articleID, url: url, download: false });

        // }), mongo.insertMany(paperCollection, articleURLArray, (err, result) => {
        //     if (err) throw err;
        //     logger.log('成功插入' + result.insertedCount + '条数据');
        // });

        // if (pageCount < maxPage) {
        //     pageCount++;
        //     formData2.page = pageCount.toString();
        //     getArticlesUrl(pageCount);
        // }
    })

    // fs.readFile('./testFile.html', 'UTF-8', function (err, data) {
    //     if (err) throw err;
    //     var $ = cheerio.load(data, { decodeEntities: false });
    //     var cards = $('.tbb');
    //     cards.each(function (i) {
    //         console.log($(this).find('a').attr('href'))
    //     })
    // });

}

var getSingleVersionInfo = function (verName, verNum, pageNum) {
    logger.log(verName);
    logger.log(verNum);

    pageNum = pageNum + 1;

    logger.log(pageNum);
    var url_singleVersion = url + verName + '/' + '?page=' + pageNum;
    common.get(url_singleVersion, null, function (err, data) {
        if (err) throw err;

        var $ = cheerio.load(data, { decodeEntities: false })

        var hasNextPage = $('.right').find('a').text().indexOf('Next') >= 0;

        //生成批量插入sql
        var sqls = new Array();
        $(".notice").each(function(i){
            $(this).find("p a").each(function(){
                var text=$(this).text();
                text=trim(text);
                var href=$(this).attr('href')
                sqls.push("INSERT IGNORE INTO ubuntu (version_num, version_name,vulnerability_num,vulnerability_url) \
                VALUES ('" + verNum + "'," + verName + "," + text + ",'" + href + "')");
            })
        })

    

        mysql.mutliquery(sqls, function (err) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, newusers.length);
            sqls = null;
            newusers = null;
        });

        if (hasNextPage) {
            getSingleVersionInfo(verName, verNum, pageNum)
        }
    })
}

function trim(str) { //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

getAll();
