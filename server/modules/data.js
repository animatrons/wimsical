const db = require('../database');

//* here we created a module for interacting with data stored in the database

class data {
    static postIt(text) {
        return new Promise((resolve, reject) => {
            console.log('b4 clear query frist promise');
            db.query('CALL clear_keys();', (err, res) => {
                console.log('in clear query');
                // if(err.error) return reject(err);
                console.log('clear query happened');
                resolve();
            })
        }).then(() => {
            return new Promise((resolve, reject) => {
                console.log('b4 post query frist promise');
                db.query(`CALL post('${text}', '');`, (err, res) => {
                    console.log('in post query');
                    if (err.error) return reject(err);
                    console.log('post query happened');
                    resolve(res[0].return_key);
                })
            })
        })

        // .then(() => {
        //     db.query(`CALL post(${text}, '');`, (err, res) => {
        //         console.log('in post query');
        //         if (err.error) return callback(err);
        //         console.log('post query happened');
        //         callback(res[0].return_key);
        //     })
        // });
    }

    static getPost(key) {
        return new Promise((resolve, reject) => {
            db.query('CALL clear_keys();', (err, res) => {
                console.log('Get post: in clear query');
                if (err.error) return reject(err);
                resolve();
            })
        }).then(() => {
            return new Promise((resolve, reject) => {
                db.query(`SELECT COUNT(*) FROM user_post WHERE user_key = ($1);`, [key], (err, res) => {
                    if (err.error) 
                        return reject(err);
                    if (!parseInt(res[0].count)) return reject(key);
                    // console.log(`first promise, number of posts: ${res[0].count}`);
                    console.log('Get post: in COUNT query');
                    resolve(res[0].count);
                })
            })
        }).then(result => {
            // console.log(`still in it, second promise, number of posts: ${result}`);
            return new Promise((resolve, reject) => {
                db.query(`SELECT post FROM user_post WHERE user_key = ($1);`, [key], (err, res) => {
                    if (err.error)
                        return reject(err);
                    console.log('Get post: in SELECT query');
                    resolve(res[0].post);
                })
            })
        })
    }
}

module.exports = data;