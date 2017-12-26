var CVE = require('./CVE.js')
var logger = require("./logger")
var config = require("./config")



var main = function () {
    // getRedhatInfo(function(){

    // });

    // getSUSEInfo(function(){

    // });

    // getDebianInfo(function(){

    // });

    // getFedoraInfo(function () {

    // });


    // getCentOSInfo(function(){

    // });


    //  getSlackwareInfo(function(){

    //     });

    getMandrivaInfo(function () {

    });
}

var getRedhatInfo = function (callback) {
    logger.log("redhat begin!");
    CVE.getVersionList(config.redhat_url, function (urlArray) {

        getRedhatSingeleVersion(0, urlArray, function () {
            callback();
        });

    })
}

var getRedhatSingeleVersion = function (count, urlArray, callback) {

    var version = urlArray[count].version;
    var verURL = urlArray[count].url;
    var edition = urlArray[count].edition;
    var verNum = "redhat" + " " + version;
    CVE.getSingleVersionInfo(verURL, verNum, edition, "redhat");

    count = count + 1;

    if (count < urlArray.length) {
        getRedhatSingeleVersion(count, urlArray, callback);
    } else {
        logger.log("redhat finished");
        callback();
    }
}


var getSUSEInfo = function (callback) {

    logger.log("redhat begin!");
    CVE.getVersionList(config.suse_linux_url, function (urlArray) {
        getSUSESingeleVersion(0, urlArray, function () {
            callback();
        });

    })
}


var getSUSESingeleVersion = function (count, urlArray, callback) {

    var version = urlArray[count].version;
    var verURL = urlArray[count].url;
    var edition = urlArray[count].edition;
    var verNum = "suse" + " " + version;
    CVE.getSingleVersionInfo(verURL, verNum, edition, "suse_linux");

    count = count + 1;

    if (count < urlArray.length) {
        getSUSESingeleVersion(count, urlArray, callback);
    } else {
        logger.log("suse finished");
        callback();
    }
}

//debian scripts;

var getDebianInfo = function (callback) {

    logger.log("debian begin!");
    CVE.getVersionList(config.debian, function (urlArray) {
        getDebianSingeleVersion(0, urlArray, function () {
            callback();
        });

    })
}


var getDebianSingeleVersion = function (count, urlArray, callback) {

    var version = urlArray[count].version;
    var verURL = urlArray[count].url;
    var edition = urlArray[count].edition;
    var verNum = "debian" + " " + version;
    CVE.getSingleVersionInfo(verURL, verNum, edition, "debian");

    count = count + 1;

    if (count < urlArray.length) {
        getDebianSingeleVersion(count, urlArray, callback);
    } else {
        logger.log("debian finished");
        callback();
    }
}

//dedora scripts;

var getFedoraInfo = function (callback) {

    logger.log("fedora begin!");
    CVE.getVersionList(config.fedora, function (urlArray) {
        getFedoraSingeleVersion(0, urlArray, function () {
            callback();
        });

    })
}


var getFedoraSingeleVersion = function (count, urlArray, callback) {

    var version = urlArray[count].version;
    var verURL = urlArray[count].url;
    var edition = urlArray[count].edition;
    var verNum = "fedora" + " " + version;
    CVE.getSingleVersionInfo(verURL, verNum, edition, "fedora");

    count = count + 1;

    if (count < urlArray.length) {
        getFedoraSingeleVersion(count, urlArray, callback);
    } else {
        logger.log("fedora finished");
        callback();
    }
}

//centos scripts;
var getCentOSInfo = function (callback) {

    logger.log("centos begin!");
    CVE.getVersionList(config.centos, function (urlArray) {
        getCentOSSingeleVersion(0, urlArray, function () {
            callback();
        });

    })
}


var getCentOSSingeleVersion = function (count, urlArray, callback) {

    var version = urlArray[count].version;
    var verURL = urlArray[count].url;
    var edition = urlArray[count].edition;
    var verNum = "centos" + " " + version;
    CVE.getSingleVersionInfo(verURL, verNum, edition, "centos");

    count = count + 1;

    if (count < urlArray.length) {
        getCentOSSingeleVersion(count, urlArray, callback);
    } else {
        logger.log("centos finished");
        callback();
    }
}


//slackware scripts;
var getSlackwareInfo = function (callback) {

    logger.log("slackware begin!");
    CVE.getVersionList(config.slackware, function (urlArray) {
        getSlackwareSingeleVersion(0, urlArray, function () {
            callback();
        });

    })
}


var getSlackwareSingeleVersion = function (count, urlArray, callback) {

    var version = urlArray[count].version;
    var verURL = urlArray[count].url;
    var edition = urlArray[count].edition;
    var verNum = "slackware" + " " + version;
    CVE.getSingleVersionInfo(verURL, verNum, edition, "slackware");

    count = count + 1;

    if (count < urlArray.length) {
        getSlackwareSingeleVersion(count, urlArray, callback);
    } else {
        logger.log("slackware finished");
        callback();
    }
}



//mandriva scripts;
var getMandrivaInfo = function (callback) {

    logger.log("mandriva begin!");
    CVE.getVersionList(config.mandriva, function (urlArray) {
        getMandrivaSingeleVersion(0, urlArray, function () {
            callback();
        });

    })
}


var getMandrivaSingeleVersion = function (count, urlArray, callback) {

    var version = urlArray[count].version;
    var verURL = urlArray[count].url;
    var edition = urlArray[count].edition;
    var verNum = "mandriva" + " " + version;
    CVE.getSingleVersionInfo(verURL, verNum, edition, "mandriva");

    count = count + 1;

    if (count < urlArray.length) {
        getMandrivaSingeleVersion(count, urlArray, callback);
    } else {
        logger.log("mandriva finished");
        callback();
    }
}

main();
