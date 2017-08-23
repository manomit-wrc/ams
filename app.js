var express = require('express');
var session  = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');


var exphbs  = require('express-handlebars');

var app = express();

var port     = process.env.PORT || 8080;

var passport = require('passport');
var flash    = require('connect-flash');
var models = require("./models");
require('./config/passport')(passport,models.Admin);

// view engine setup
// Database test
models.sequelize.sync().then(function() {

    console.log('Nice! Database looks fine')


}).catch(function(err) {

    console.log(err, "Something went wrong with the Database Update!")

});

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'W$q4=25*8%v-}UV',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./routes/index')(app, passport);
app.use(function(req, res, next){
  if (req.isAuthenticated())
  {
    delete req.user.password;
    if (fs.existsSync("public/profile/thumbs/"+req.user.avator) && req.user.avator != "") {
      res.locals.image = "/profile/thumbs/"+req.user.avator;
    }
    else {
      res.locals.image = "/user2-160x160.jpg";
    }
    res.locals.user = req.user;
    return next();
  }
  res.redirect('/admin');
});


require('./routes/profile')(app, models.Admin);
require('./routes/section')(app, models.Section);
require('./routes/codecategory')(app, models.Codecategory);
require('./routes/codemaster')(app, models.Codemaster);


// catch 404 and forward to error handler


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port);
console.log('The magic happens on port ' + port);

module.exports = app;
