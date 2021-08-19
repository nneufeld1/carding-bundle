const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

//Set view engine as ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Set json for easy response
app.use(express.json());

//Routes
const Home = require('./routes/home');
const Generatecard = require('./routes/generatecard');
const LiveCC = require('./routes/livecc');
const BinChecker = require('./routes/binchecker');

//Initiate Router
app.use('/', Home);
app.use('/', Generatecard);
app.use('/', LiveCC);
app.use('/', BinChecker);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
