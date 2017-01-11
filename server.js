var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');

var db = massive.connectSync({
  connectionString : 'postgres://postgres:Kmalone32@localhost:4000/massive_demo'
});

var app = express();
app.use(bodyParser.json());

var port = 3000;

app.get('/', function(req, res) {
  db.get_all_injuries(function(err, injuries) {
    res.send(injuries);
  });
});

app.get('/incidents', function(req, res) {
  var state = req.query.state;
  if (!state) {
    db.get_all_incidents(function(err, incidents) {
      res.send({
        incidents: incidents
      });
    });
  } else {
    db.get_all_incidents_state([state], function(err, incidents) {
      res.send({
        incidents: incidents
      });
    });
  }
});

app.post('/incidents', function(req, res) {
  console.log(req.body);
  db.create_incident([req.body.usState, req.body.injId, req.body.causeId], function(err, result) {
    res.send(result);
  });
});

app.listen(port, function() {
  console.log("Started server on port", port);
});
