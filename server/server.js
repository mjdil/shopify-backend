var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {product} = require('./models/product');
var {user} = require('./models/user');
var {product} = require('./models/cartItem');

var cookieSession = require('cookie-session');
var keys = require('./config/keys.js');
var passport = require('passport');
require('./services/passport');

var app = express();

//app.use = middleware; this gets called before every requ


//since we are using cookie auth, this is the configuration, we are telling express how long the cookie canbe valid for before it expires

app.use(cookieSession({
  maxAge: 30*24*60*60*1000,
  keys:[keys.cookieKey]
}));


// this fixes the bug of where the google sign in page kept freezing
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

require('./routes/authRoutes.js')(app);
require('./routes/inventoryRoutes.js')(app);
require('./routes/checkoutRoutes.js')(app);


app.listen(3000, ()=>{
  console.log("this app is listening on port 3000");
});
