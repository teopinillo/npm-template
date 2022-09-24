const {logEvents} = require('./logEvents');

const errorHandler =  (error,req, res, next)=> {
    logEvents (JSON.stringify(error),'errLog.txt');
    console.error ( error );
    res.status(500).send(JSON.stringify(error));
}

module.exports =  errorHandler;