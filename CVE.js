
var common = require("./common")
var cheerio = require('cheerio');
var cheerioTableparser = require('cheerio-tableparser');
var logger = require('./logger');
var config = require('./config')
var mysql = require("./mysql")
var fs = require('fs');
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


exports.getVersionList = function (url, callback) {

    common.get(url, null, function (err, data) {
        if (err) throw err;

        var arrayVersionURL = new Array();
        var $ = cheerio.load(data, { decodeEntities: false });
        TB = cheerio.load($.html("table .listtable"));
        cheerioTableparser(TB);
        var arr2 = TB("table").parsetable()

        for (var i = 1; i < arr2[0].length; i++) {
            var versionUrlObj = {
                version: trim(arr2[0][i]),
                edition:trim(arr2[3][i]),
                url: getUrl(arr2[5][i])
            }
            arrayVersionURL.push(versionUrlObj);
        }

        // for(var j=0; j <arrayVersionURL.length; j++){
        //     logger.log(arrayVersionURL[j].version+" "+arrayVersionURL[j].url);
        // }

        callback(arrayVersionURL);

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

exports.getSingleVersionInfo = function (baseURL, url, version_num,edition, dbTable) {
    logger.log(url);

    var url_singleVersion = baseURL + url;

    common.get(url_singleVersion, null, function (err, data) {
        if (err) throw err;

        var $ = cheerio.load(data, { decodeEntities: false })

        $("#pagingb").find("a").each(function (i) {
            var sqls = new Array()
            var pageHref = $(this).attr('href');

            logger.log(pageHref);

            common.get(baseURL + pageHref, null, function (err, data) {
                var $_page = cheerio.load(data);

                TB = cheerio.load($_page.html("#vulnslisttable"));
                cheerioTableparser(TB);
                var arrTB = TB("table").parsetable()

                for (var i = 1; i < arrTB[0].length; i = i + 2) {
                    var $_tem = cheerio.load(trim(arrTB[1][i]));
                    var $_temScore = cheerio.load(trim(arrTB[7][i]));


                    var vulnerability_num = trim($_tem("a").text());
                    var vulnerability_url = baseURL + $_tem("a").attr("href")
                    var publish_date = trim(arrTB[5][i]);
                    var publish_date = trim(arrTB[6][i]);
                    var cvss_score = trim($_temScore("div").text());


                    sqls.push("INSERT IGNORE INTO " + dbTable + " (version_num,vulnerability_num,vulnerability_url,edition,publish_date,update_date,cvss_score)" +
                        " VALUES ('" + version_num + "','" + vulnerability_num + "','" + vulnerability_url + "','" + edition + "','" + publish_date + "','" + publish_date + "','" + cvss_score + "')");
                }

                for (var ind = 0; ind < sqls.length; ind++) {
                    logger.log(sqls[ind]);
                }

                mysql.mutliquery(sqls, function (err) {
                    if (err) {
                        throw err;
                    }
                });

            })



        })





    })
}

function trim(str) { //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function getUrl(rawStr) {
    var str = new String(trim(rawStr));
    str = str.replace(/(\<a)(.*)(\;)/g, "");
    return str.match(/(\/vulne)(.*)(\.html)/g);
}

