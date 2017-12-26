
var comm = require('./common');

var logger=require("./logger");

exports.log = function (message) {
    console.log(comm.getDateString() + ' ' + message);
}

exports.dir = function (obj) {
    console.log(comm.getDateString());
    console.dir(obj);
}

exports.propFuncion = (obj) => {
    logger.log("function property:");
    for (var prop in obj) {
        if (typeof obj[prop] == "function") {
            console.log(prop)
        }
    }
}