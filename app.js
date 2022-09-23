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
const { logger } = require ("./middleware/logEvents")
const errorHandler = requiere("./middleware/errorHandler");

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
app.use(express.static( path.join (__dirname,'/public')));

//favicon
//var favicon = require ('serve-favicon');
//app.use ( favicon (path.join (__dirname,'public','img',"favicon.ico")));

const port = 3001;

//express check the url in the same order that are here
//the las .get could be used as default

app.use ( logger );



app.use (cors (corsOptions) );

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

app.get('/log', (req, res) => {
    res.sendFile( path.join(__dirname,'logs','log.txt'));
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