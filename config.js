exports.jsonPath = "./json/";//生成json文件的路径

exports.dbconfig = {
    host: 'localhost',//数据库服务器
    user: 'root',//数据库用户名
    password: 'root',//数据库密码
    database: 'linux_vulnerability',//数据库名
    port: 3306,//数据库服务器端口
    poolSize: 20,
    acquireTimeout: 30000
};

exports.CVEURL='https://www.cvedetails.com'//CVE网址
exports.ubuntu_url = "https://usn.ubuntu.com/usn/";//ubuntu官网漏洞信息发布
exports.redhat_url = "https://www.cvedetails.com/version-list/25/78/1/Redhat-Enterprise-Linux.html";//CVE redhat漏洞根据版本分类    
exports.suse_linux_url="https://www.cvedetails.com/version-list/61/92/1/Suse-Suse-Linux.html"
exports.debian="https://www.cvedetails.com/version-list/23/36/1/Debian-Debian-Linux.html";
exports.fedora="https://www.cvedetails.com/version-list/6924/16334/1/Fedoraproject-Fedora.html"
exports.centos="https://www.cvedetails.com/version-list/10167/18131/1/Centos-Centos.html";
exports.slackware="https://www.cvedetails.com/version-list/27/41/1/Slackware-Slackware-Linux.html";
exports.mandriva="https://www.cvedetails.com/version-list/7101/20861/1/Mandriva-Enterprise-Server.html";






