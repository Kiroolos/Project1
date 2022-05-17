var url = 'http://mylogger.io/log';

function log(req,res,next) {
console.log("Logging...");
next();
}


module.exports = log; 
