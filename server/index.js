//*imports packages
const path = require('path'); //* path a nodejs native module for operations with file paths and opening
const express = require('express');//* express back end server framework
const bodyParser = require('body-parser');//* for http interpertations of data sent back and forth between backend and front end

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
//*export the app variable from our file so it can be run via command
module.exports = app;