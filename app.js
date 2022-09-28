//jshint esversion: 6

//cross origin resource sharing.
// =============================> remove || origin on production
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin){
        callback ( null, true)
        } else {
        callback (new Error('Not allowed by CORS'));
    }
},
    optionSuccessStatus: 200
}

// =============================> remove local host on production
const whitelist = ['https://www.mysitename.com','http://127.0.0.1:3001','http://localhost:3001'];

const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");
const request = require ("request");
const date_fns = require ("date-fns");
const { v4 : uuid } = require ("uuid");
const path = require ("path");
const logEvent = require ("./middleware/logEvents")
const { logger } = require ("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const cors = require ('cors');

console.log ("app_name v1.0 (c)teopi");
console.log (date_fns.format( new Date(),"yyyyMMdd\tHH:mm:ss"));
console.log ( "uuid :" + uuid());

const app = express();

//middleware to handle urlencoded data, in other words form-data
app.use(bodyParser.urlencoded({extended:false}));

//built-in middleware for json
app.use ( express.json () );

//serve static file
app.use('/',express.static( path.join (__dirname,'/public')));
app.use('/subdir', express.static( path.join (__dirname,'/public')));

app.use ('/', require('./routes/root'));
app.use ('/subdir', require('./routes/subdir'));
app.use ('/employees', require('./routes/employees'));

const port = 3001;

//express check the url in the same order that are here
//the las .get could be used as default

app.use ( logger );

app.use (cors (corsOptions) );

//app.post('/', (req, res)=>{
    
//    let fetcchURL = "some_url";
//   https.get (url, (response)=>{
//                
//        response.on("data", (rawData) => {
//        let data = JSON.parse(rawData);          
//         
//		res.writes ('some_html_code');
//        res.write ('more_html_code');
//        res.send();
//        })
//    });
//});
  
//dont put any get after this. This will be the default
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile( path.join(__dirname,'views','404.html'));
    } else if (req.accepts('json')){
        res.send ({error:"404 Not Found"});
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use (errorHandler );

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})