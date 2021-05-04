//*imports packages
const path = require('path'); //* path a nodejs native module for operations with file paths and opening
const express = require('express');//* express back end server framework
const bodyParser = require('body-parser');//* for http interpertations of data sent back and forth between backend and front end

//*importing our DataBase module from /database/index.js
var db = require('./database');
const { resolve } = require('path');

const ENV = process.env.NODE_ENV; //* info about if the env we're working in is in developement or production, we can use that info to make changes to our back end process
const PORT = process.env.PORT || 5000;//* witch port the express server will be running on

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json()); 

//*make express responsive to requests
app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}........`);
})
//* test
// db.query('SELECT NOW()', (err, res) => {
//     if (err.error)
//         return console.log(err.error);
//     console.log(`PostgreSQL connected: ${res[0].now}`);
// })
// db.query('SELECT * FROM keys_free;', (err, res) => {
//     if (err.error)
//         return console.log(err.error);
//     console.log(`PostgreSQL connected: ${res}`);
// })

db.query('SELECT * FROM keys_free WHERE id < 40;', (err, res) => {
    if (err.error)
        return console.log(err.error);
    const data = res;
    console.log('Free keys: ')
    // console.log(res);
    // console.log(data);
    data.forEach(row => console.log(`id: ${row.id}, key: ${row.free_key}`));
})

num_keys = 0;
db.query('SELECT COUNT(*) FROM keys_free;', (err, res) => {
    if (err.error)
        return console.log((err.error));
    console.log(num_keys);
    num_keys = parseInt(res[0].count);
    console.log(num_keys);
})
setTimeout(() => {
    console.log(num_keys + 1);
}, 4000);

function getPost(key) {
    return new Promise((resolve, reject) => {
        key = key.toLocaleUpperCase('en-US');
        db.query(`SELECT COUNT(*) FROM user_post WHERE user_key = '${key.toString().toLocaleUpperCase('en-US')}';`, (err, res) => {
            if (err.error) 
                return reject(key);
            // if (!res[0].count) reject(key);
            console.log(`first promise, number of posts: ${res[0].count}`);
            resolve(res[0].count);
        })
    }).then(result => {
        console.log(`still in it, second promise, number of posts: ${result}`);
        return new Promise((resolve, reject) => {
            db.query(`SELECT post FROM user_post WHERE user_key = '${key.toString().toLocaleUpperCase('en-US')}';`, (err, res) => {
                if (err.error)
                    return console.log(('Again? : ' + err.error));
                resolve(res[0].post);
            })
        })
    })
}

getPost('T02H6')
    .then(res => console.log('wow it got relsolved, post: ' + res))
    .catch(k => console.log(`ERROR: key ${k} not found.`));

//*export the app variable from our file so it can be run via command
module.exports = app;