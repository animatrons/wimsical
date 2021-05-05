var { Pool } = require('pg'); //*postgres client pg, this will be the interface we'll be using to interact with a pg instance installed on our srver wether local or deployed

const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:0000@localhost:5432/wim-db'; //* when we deploy the app to heroku it will set the DATABASE_URL to connect to a satabase that's running on their env
const SSL = process.env.NODE_ENV === 'production' //* ssl will be set to node_env if the envirenement we're in is the production

class Database {
    constructor () {
        this._pool = new Pool({
            connectionString: CONNECTION_STRING,
            ssl: SSL
            
        })

        this._pool.on('error', (err, client) => {
            console.error('Unexpected error on idle PostgreSQL client.', err);
            process.exit(-1);
        });
    }

    query (query, ...args) {
        this._pool.connect((err, client, done) => {
            if (err) throw err;
            const params = args.length === 2 ? args[0] : [];
            const callback = args.length === 1 ? args[0] : args[1];

            client.query(query, params, (err, res) => {
                done();
                if (err) {
                    console.log(err.stack);
                    return callback({ error: 'Database this error.'}, null);
                }
                callback({}, res.rows);
            })
        })
    }

    end () {
        this._pool.end();
    }
}

module.exports = new Database();