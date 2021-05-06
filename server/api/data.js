//** now that we can connect and retrieve or insert data using the models/data.js module
//* we have to set up this api endpoint that will allow us to send and retrieve data from the back end to the front end

const { json } = require('body-parser');
var express = require('express');
var data = require('../modules/data');

var router = express.Router();

// router.get('/', (req, res) => {
//     r = 'wow a post';
    
//     console.log('this the router post ');
//     data.postIt(r)
//         .then(ret_key => { return res.send(ret_key)})
//         .catch(err => {return res.send('some error' + err)});
// });
router.post('/', (req, res) => {
    var txt = req.body.text;
    data.postIt(txt)
        .then(ret_key => { return res.send(ret_key)})
        .catch(err => {return res.json('some error' + err)});
});
router.get('/:key', (req, res) => {
    // console.log('this the router get')
    var key = req.params.key;

    data.getPost(key) 
        .then(post => {return res.send(post)})
        .catch(key => {return res.send('Oooops')})
        .catch(err => {return res.json(err)})
        // .catch(key => {return res.json(key)})
});




module.exports = router; 