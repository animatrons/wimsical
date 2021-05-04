const db = require('../database');

class data {
static post (text, callback) {

}

static get (post_key, callback) {
    db.query('SELECT post FROM user_post where user_key = $1;', [post_key], (err, res) => {
        if (err.error) {
            this.get_err = true;
            return callback(err);
        }
        callback(res);
    });
}
}

module.exports = data;