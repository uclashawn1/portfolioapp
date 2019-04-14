var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/portfolio' || process.env.MONGODB_URI, { useNewUrlParser: true });
console.log("Listening Now");
// can clean the above code with this structure. seek help for implementation

db = mongoose.connection;
async = require('async');


// var express = require('express');
// var path = require('path');
// var bodyParser = require('body-parser');
// var exphbs = require('express-handlebars');
// var expressValidator = require('express-validator');
// var session = require('express-session');
// var flash = require('connect-flash');
// var multer = require('multer');
// var upload = multer({ dest: './public/images/' });

// Route Files
var routes = require('./routes/index');
var admin = require('./routes/admin');

// Init App
var app = express();

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Handle Sessions
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true
}));

// Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Connect Flash
app.use(flash());

app.use('/', routes);
app.use('/admin', admin);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port: '+app.get('port'));
});

module.exports = app;