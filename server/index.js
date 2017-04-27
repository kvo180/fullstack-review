var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var apiKey = require('./config/github');
var Repo = require('../database/index');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos/import', function (req, res) {
  var username = req.body.username;
  var key = apiKey();

  var options = {
    url: `https://api.github.com/users/${username}/repos`,
    // access_token: key,
    headers: {
      'User-Agent' : req.headers['user-agent'],
      'Authorization': 'token ' + key
    }
  }

  request(options, (err, res, body) => {

    var repoArr = JSON.parse(body);

    repoArr.forEach((repo) => {
      var repoObj = parseRepoObjs(repo);
      var repo = new Repo(repoObj);

      repo.save()
      .then(() => {
        console.log('saved to database successfully');
      })
      .catch((err) => {
        return console.error(err);
      });
    });
  });
});

var parseRepoObjs = (repo) => {
  var repoObj = {
    id: repo['id'],
    username: repo['owner']['login'],
    name: repo['name'],
    html_url: repo['html_url'],
    description: repo['description'],
    updated_at: repo['updated_at']
  };

  return repoObj;
};

app.get('/repos', function (req, res) {

});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
