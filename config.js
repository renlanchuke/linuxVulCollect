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

exports.ubuntu_url = "https://usn.ubuntu.com/usn/";//ubuntu官网漏洞信息发布


