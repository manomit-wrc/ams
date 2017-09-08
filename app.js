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

var port = process.env.PORT || 8080;

var passport = require('passport');
var flash    = require('connect-flash');
var models = require("./models");

require('./config/passport')(passport,models.admin);


// view engine setup
// Database test
models.sequelize.sync().then(function() {

    console.log('Nice! Database looks fine')


}).catch(function(err) {

    console.log(err, "Something went wrong with the Database Update!")

});

app.set('views', path.join(__dirname, 'views'));
var hbs = exphbs.create({
extname: '.hbs', //we will be creating this layout shortly
helpers: {
    if_eq: function (a, b, opts) {

        if (a == b) // Or === depending on your needs
            return opts.fn(this);
        else
            return opts.inverse(this);

    },
    inArray: function(array, value, block) {
      if (array.indexOf(value) !== -1) {
        return block.fn(this);
      }
      else {
        return block.inverse(this);
      }
    },
    eq: function (v1, v2) {
        return v1 === v2;
    },
    ne: function (v1, v2) {
        return v1 !== v2;
    },
    lt: function (v1, v2) {
        return v1 < v2;
    },
    gt: function (v1, v2) {
        return v1 > v2;
    },
    lte: function (v1, v2) {
        return v1 <= v2;
    },
    gte: function (v1, v2) {
        return v1 >= v2;
    },
    and: function (v1, v2) {
        return v1 && v2;
    },
    or: function (v1, v2) {
        return v1 || v2;

    }
}
});
app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(session({
	secret: 'W$q4=25*8%v-}UV',
	resave: true,
	saveUninitialized: true
 })); // session secret
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

    res.locals.active = req.path.split('/')[2];

    return next();
  }
  res.redirect('/admin');
});

require('./routes/profile')(app, models.admin);
require('./routes/section')(app, models.section);
require('./routes/practice-area')(app, models.practicearea);
require('./routes/codecategory')(app, models.codecategory);
require('./routes/codemaster')(app, models.codemaster, models.codecategory);
require('./routes/designation')(app, models.designation);
require('./routes/group')(app, models.group);
require('./routes/app-profile')(app, models.appprofile, models.admin);
require('./routes/firmcodes')(app, models.firmcodes, models.codemaster); //we will be passing firm models shortly
require('./routes/firmgroup')(app, models.firmgroup, models.group); //we will be passing firm models shortly
require('./routes/import-excel')(app, models.admin,fs);
require('./routes/firm')(app,models);
require('./routes/jurisdiction')(app, models.jurisdiction);
require('./routes/role')(app, models.role);
require('./routes/industry-type')(app, models.industrytype);
require('./routes/budgetcodetype')(app, models.budgetcodetype);
require('./routes/budgetcode')(app, models.budgetcode, models.budgetcodetype);
require('./routes/job-type')(app, models.jobtype);
require('./routes/attorney-type')(app, models.attorneytype);
require('./routes/attorney')(app,models);


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
