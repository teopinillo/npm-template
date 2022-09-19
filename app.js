//jshint esversion: 6
const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");
const request = require ("request");
const date_fns = require ("date-fns");
const { v4 : uuid } = require ("uuid");
const path = require ("path");
const logEvent = require ("./middleware/logEvents")

console.log ("app_name v1.0 (c)teopi");
console.log (date_fns.format( new Date(),"yyyyMMdd\tHH:mm:ss"));
console.log ( "uuid :" + uuid());

const app = express();

//middleware to handle urlencoded data, in other words form-data
app.use(bodyParser.urlencoded({extended:false}));

//built-in middleware for json
app.use ( express.json () );

//serve static file
app.use(express.static( path.join (__dirname,'/public')));

//favicon
//var favicon = require ('serve-favicon');
//app.use ( favicon (path.join (__dirname,'public','img',"favicon.ico")));

const port = 3001;

//express check the url in the same order that are here
//the las .get could be used as default

app.use ( (req, res, next) =>{
    logEvent (`${req.method}\t${req.headers.origin}\t${req.url}`,'log.txt');
    console.log (`${req.method} ${req.path}`);
});

//express support regular expression in the url
//^ = start, $ = end, | = or, ( ... )? = optional
app.get('^/$|/index(.html)?', (req, res) => {
        res.sendFile('./views/index.html', { root : __dirname });
        //another way
        //res.sendFile( path.join(__dirname,'views','index.html'));
        //res.send('Hello World');
});

//redirect example
app.get('/home', (req, res) => {
    res.redirect( 301, 'index'); //302 by default
});

app.get('/about', (req, res) => {
    res.sendFile( path.join(__dirname,'views','about.html'));
});

app.post('/', (req, res)=>{
    
    let fetcchURL = "some_url";
    https.get (url, (response)=>{
                
        response.on("data", (rawData) => {
        let data = JSON.parse(rawData);          
         
		res.writes ('some_html_code');
        res.write ('more_html_code');
        res.send();
        })
    });
});
  
//dont put any get after this. This will be the default
app.get('/*', (req, res) => {
    res.status(404).sendFile( path.join(__dirname,'views','404.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})