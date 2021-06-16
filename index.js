//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
const cors = require('cors');

const cron = require('node-cron');

const app = express();
const serverport = 5000;



 
//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public sebagai static folder untuk static file
app.use('/assets',express.static(__dirname + '/public'));


let indexrouter = require('./routes/routes');

app.use('/', indexrouter);
 
require ('custom-env').env('staging')
//server listening
app.listen(serverport, () => {
    console.log('database',process.env.DB_NAME);
  console.log('Server is running at port',serverport);
});



cron.schedule('*/1 * * * *', () => {
  console.log('running a task every minute');
});
