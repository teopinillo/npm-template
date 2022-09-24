const express = require('express');
const router = express.Router();
const path = require('path');

//express support regular expression in the url
//^ = start, $ = end, | = or, ( ... )? = optional
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile( path.join(__dirname,'..','views','index.html'));
    //another way
    //res.sendFile( path.join(__dirname,'views','index.html'));
    //res.send('Hello World');
});

//redirect example
router.get('/home', (req, res) => {
res.redirect( 301, 'index'); //302 by default
});

router.get('/about', (req, res) => {
res.sendFile( path.join(__dirname,'..','views','about.html'));
});

router.get('/logs', (req, res) => {
res.sendFile( path.join(__dirname,'..','logs','log.txt'));
});

module.exports = router;