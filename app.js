var express = require('express');
var session  = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var count;


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
    dateFormat: require('handlebars-dateformat'),

    inc: function(value, options) {
      return parseInt(value) + 1;
    },
    integer: function(value) {
      return parseInt(value);
    },
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

    for: function(from, to, incr, block) {
    	var accum = 0;
	    for(var i = from; i < to; i += incr)
	        accum += block.fn(i);
	    return accum;
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
    },
    referred_name: function(value) {
		var name = '';
		models.mastercontact.findAll({
			where: {
				id: value
			},
			attributes : ['first_name' ,'last_name']
		}).then(function(response){
			name = response[0].first_name;

		});
		return name;
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
	resave: false,
	saveUninitialized: false
 })); // session secret
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./routes/index')(app, passport);
app.use(function(req, res, next){
  if (req.isAuthenticated())
  {
    if(req.user.role_code == 'FIRMADM'){   // for 'act as attorney' allowance of a firm
      models.firm.findAll({
         where: {
            user_id: req.user.id
          }
      }).then(function(firm){
            models.attorney.findAndCountAll({
                where: {
                  firm_id: firm[0].id
                }
            }).then(function(result){
                count = result.count;
            }); 
      });
      if(count > 0) {
            res.locals.is_attorney = 1;

            delete req.user.password;
            if (fs.existsSync("public/profile/thumbs/"+req.user.avator) && req.user.avator != "") {
              res.locals.image = "/profile/thumbs/"+req.user.avator;
            }
            else {
              //res.locals.image = "/user2-160x160.jpg";
              res.locals.image = "/admin/images/2.png";
            }
            res.locals.user = req.user;                            

            res.locals.active = req.path.split('/')[2];
            return next();
      } else {
            delete req.user.password;
            if (fs.existsSync("public/profile/thumbs/"+req.user.avator) && req.user.avator != "") {
              res.locals.image = "/profile/thumbs/"+req.user.avator;
            }
            else {
              //res.locals.image = "/user2-160x160.jpg";
              res.locals.image = "/admin/images/2.png";
            }
            res.locals.user = req.user;                            

            res.locals.active = req.path.split('/')[2];
            return next();
      }
    } else {
            delete req.user.password;
            if (fs.existsSync("public/profile/thumbs/"+req.user.avator) && req.user.avator != "") {
              res.locals.image = "/profile/thumbs/"+req.user.avator;
            }
            else {
              //res.locals.image = "/user2-160x160.jpg";
              res.locals.image = "/admin/images/2.png";
            }
            res.locals.user = req.user;                            

            res.locals.active = req.path.split('/')[2];
            res.locals.next_active = req.path.split('/')[3];
            return next();  
    }
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
require('./routes/master-contact')(app, models,fs);
require('./routes/client')(app, models);
require('./routes/target')(app, models);
require('./routes/referrel')(app, models);
require('./routes/opportunity')(app, models);
require('./routes/attorney-goal')(app, models);
require('./routes/firm-location')(app, models);
require('./routes/activity')(app, models);
require('./routes/activity-budget')(app, models);
require('./routes/firm-activity')(app, models);
require('./routes/attorney-target')(app, models);
require('./routes/attorney-referrel')(app, models);
require('./routes/competitor')(app, models);
require('./routes/attorney-budget-report')(app, models);
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