const express = require('express');
const router = express.Router();
const path = require('path');
const { route } = require('../root');
const data = {};
data.employees = require('../../data/employees.json');

route.route('/')
    .get((req,res)=>{
        res.json(data.employees);
    })
    .post((req,res) => {
        res.json({
            "firstname" : req.body.firstname,
            "lastname": req.body.lasname
        });
    })    
    .put((req,res) => {
        res.json({
            "firstname" : req.body.firstname,
            "lastname": req.body.lasname
        });
    })
    .delete ((req,res) => {
        res.json({"id": req.body.id })
    });

    //url with parameter
    router.route('/:id')
    .get ((req,res) => {
        res.json ({"id": req.params.id});
    })

    



module.exports = router;