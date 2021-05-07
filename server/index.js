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
app.use(express.urlencoded({extended: false}));
app.use(express.json()); 

if (ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../client/build'))); //*serve the static react file through the express app if it is i production env
    // console.log(`this is amistake`);
    app.use((req, res)=>{
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}



app.use('/api/data', require('./api/data')); //*regestering the api middleware


//*make express responsive to requests
app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}........`);
})






//* tests
db.query('SELECT NOW()', (err, res) => {
    if (err.error)
        return console.log(err.error);
    console.log(`PostgreSQL connected: ${res[0].now}`);
})
var txt = 'some other text';
// db.query("CALL post(($1), '');", ['txt'], (err, res) => {
//     if (err.error) return console.log(err.error);
//     console.log(res[0].return_key);
// })
// db.query('SELECT * FROM keys_free;', (err, res) => {
//     if (err.error)
//         return console.log(err.error);
//     console.log(`PostgreSQL connected: ${res}`);
// })

// db.query('SELECT * FROM keys_free WHERE id < 40;', (err, res) => {
//     if (err.error)
//         return console.log(err.error);
//     const data = res;
//     console.log('Free keys: ')
//     // console.log(res);
//     // console.log(data);
//     data.forEach(row => console.log(`id: ${row.id}, key: ${row.free_key}`));
// })

// num_keys = 0;
// db.query('SELECT COUNT(*) FROM keys_free;', (err, res) => {
//     if (err.error)
//         return console.log((err.error));
//     console.log(num_keys);
//     num_keys = parseInt(res[0].count);
//     console.log(num_keys);
// })
// setTimeout(() => {
//     console.log(num_keys + 1);
// }, 4000);

// function getPost(key) {
//     return new Promise((resolve, reject) => {
//         db.query('CALL clear_keys();', (err, res) => {
//             if (err.error) return console.log((err.error));
//             resolve();
//         })
//     }).then(() => {
//         return new Promise((resolve, reject) => {
//             db.query(`SELECT COUNT(*) FROM user_post WHERE user_key = ($1);`, [key], (err, res) => {
//                 if (err.error) 
//                     return console.log((err.error));
//                 if (!parseInt(res[0].count)) return reject(key);
//                 console.log(`first promise, number of posts: ${res[0].count}`);
//                 resolve(res[0].count);
//             })
//         })
//     }).then(result => {
//         console.log(`still in it, second promise, number of posts: ${result}`);
//         return new Promise((resolve, reject) => {
//             db.query(`SELECT post FROM user_post WHERE user_key = ($1);`, [key], (err, res) => {
//                 if (err.error)
//                     return console.log(('Again? : ' + err.error));
//                 resolve(res[0].post);
//             })
//         })
//     })
// }
//'${key.toString().toLocaleUpperCase('en-US')}'
// getPost('SQSH1')
//     .then(res => console.log('wow it got relsolved, post: ' + res))
//     .catch(k => console.log(`ERROR: key ${k} not found.`));
// getPost('60HF6')
//     .then(res => console.log('wow it got relsolved, post: ' + res))
//     .catch(k => console.log(`ERROR: key ${k} not found.`));
// var txt = 'hello again from vs code';
// db.query(`CALL post('${txt}', '');`, (err, res) => {
//     if (err.error) return console.log(err.error);
//     console.log(res[0].return_key);
// })


//*export the app variable from our file so it can be run via command
module.exports = app;