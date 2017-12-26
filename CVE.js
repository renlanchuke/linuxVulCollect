
var common = require("./common")
var cheerio = require('cheerio');
var cheerioTableparser = require('cheerio-tableparser');
var logger = require('./logger');
var config = require('./config')
var mysql = require("./mysql")
var fs = require('fs');

var baseUrl = config.CVEURL;
exports.getVersionList = function (url, callback) {

    common.get(url, null, function (err, data) {
        if (err) throw err;

        var arrayVersionURL = new Array();
        var $ = cheerio.load(data, { decodeEntities: false });

        var pageUrlList = $("#pagingb").find("a");
        getList(0, pageUrlList,arrayVersionURL,function(arrayVersionURL){
            callback(arrayVersionURL);
        });



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

var getList = function (count, urlList, arrayVersionURL, callback) {

    var pageHref = urlList[count].attribs.href;
    common.get(baseUrl + pageHref, null, function (err, data) {
        var $_page = cheerio.load(data);

        TB = cheerio.load($_page.html("table .listtable"));
        cheerioTableparser(TB);
        var arr2 = TB("table").parsetable()

        for (var i = 1; i < arr2[0].length; i++) {
            var versionUrlObj = {
                version: trim(arr2[0][i]),
                edition: trim(arr2[3][i]),
                url: getUrl(arr2[5][i])
            }

            //去掉空版本号
            if(/(\w)|(\d)/.test(versionUrlObj.version)){
                arrayVersionURL.push(versionUrlObj);
            }
            
        }

        if (count < urlList.length-1) {
            
            getList(count + 1, urlList, arrayVersionURL, callback);
        } else {
            callback(arrayVersionURL);
        }
    });
}


exports.getSingleVersionInfo = function (url, version_num, edition, dbTable) {
    //logger.log(url);

    var url_singleVersion = baseUrl + url;

    common.get(url_singleVersion, null, function (err, data) {
        if (err) throw err;

        var $ = cheerio.load(data, { decodeEntities: false })

        $("#pagingb").find("a").each(function (i) {
            var sqls = new Array()
            var pageHref = $(this).attr('href');

            //logger.log(pageHref);

            common.get(baseUrl + pageHref, null, function (err, data) {
                var $_page = cheerio.load(data);

                TB = cheerio.load($_page.html("#vulnslisttable"));
                cheerioTableparser(TB);
                var arrTB = TB("table").parsetable()

                for (var i = 1; i < arrTB[0].length; i = i + 2) {
                    var $_tem = cheerio.load(trim(arrTB[1][i]));
                    var $_temScore = cheerio.load(trim(arrTB[7][i]));


                    var vulnerability_num = trim($_tem("a").text());
                    var vulnerability_url = baseUrl + $_tem("a").attr("href")
                    var publish_date = trim(arrTB[5][i]);
                    var publish_date = trim(arrTB[6][i]);
                    var cvss_score = trim($_temScore("div").text());


                    sqls.push("INSERT IGNORE INTO " + dbTable + " (version_num,vulnerability_num,vulnerability_url,edition,publish_date,update_date,cvss_score)" +
                        " VALUES ('" + version_num + "','" + vulnerability_num + "','" + vulnerability_url + "','" + edition + "','" + publish_date + "','" + publish_date + "','" + cvss_score + "')");
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

