var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  repo_id: {type: Number, unique: true, dropDups: true},
  username: String,
  name: String,
  html_url: String,
  description: String,
  updated_at: Date
});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;