
/* ===================================
  ////////////  IMPORTS /////////////
 =================================== */
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')
/* ===================================
  ///////  IMPORT VARIABLES //////
 =================================== */

const authController = require('./controllers/auth');

const app = express();
/* ===================================
  ////////////  MIDDLEWARE /////////////
 =================================== */
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET_PASSWORD,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
  })
)
app.use('/auth', authController);
 /* ===================================
  ///////  MONGOOSE CONNECTION /////
 =================================== */
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});



 /* ===================================
  ////////////  ROUTES /////////////
 =================================== */

app.get('/', (req,res)=>{
    res.render('index.ejs', { user: req.session.user });
})









const PORT = process.env.PORT;
app.listen(PORT, (req,res)=>{
    console.log(`Listening on PORT: ${PORT}`);
})