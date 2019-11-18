const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { port } = require('./config');
const router = require('./router');

const app = express();

let MONGO_DB;
const DOCKER_DB = process.env.DB_PORT;
if ( DOCKER_DB ) {
  MONGO_DB = DOCKER_DB.replace( 'tcp', 'mongodb' ) + '/app';
} else {
  MONGO_DB = process.env.MONGODB;
}
var retry = 0;
mongoose.connect(MONGO_DB);

app.use(morgan('combined'));
app.use(cors());
app.enable('trust proxy');
app.use(bodyParser.json({type: '*/*'}));

router(app);

app.listen(port, () => {
  console.log(`Server started on port  + ${port}`);
});