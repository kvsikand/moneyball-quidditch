var express = require('express');
var app = express();
var Sequelize = require('sequelize');

var routes = require('./routes');
var models = require('./models');
var config = require('./config');

var postgresConfig = config.postgres;

var postgres = new Sequelize(
  postgresConfig.database,
  postgresConfig.username,
  postgresConfig.password,
  {
    dialect: postgresConfig.dialect
  }
);



app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

models.defineModels(postgres);
app.use(routes.setupRoutes(postgres));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


