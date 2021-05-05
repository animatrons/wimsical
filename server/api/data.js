//** now that we can connect and retrieve or insert data using the models/data.js module
//* we have to set up this api endpoint that will allow us to send and retrieve data from the back end to the front end

const { json } = require('body-parser');
var express = require('express');
var data = require('../modules/data');

var router = express.Router();

router.post('/', (req, res) => {
    // r = 'req';
    
    console.log('this the router post : ' + req.body);
    res.sendStatus(200);
    res.end("yes");
    // data.postIt()
    //     .then(ret_key => { return res.json(ret_key)})
        // .catch(err => {return res.json('some error' + err)});
});

const gett = router.get('/', (req, res) => {
    console.log('this the router get')
    data.getPost('RG52E') 
        .then(post => {return res.json(post)})
        .catch(key => {return res.json(key)})
        .catch(err => {return res.json(err)})
        // .catch(key => {return res.json(key)})
});




module.exports = router; 