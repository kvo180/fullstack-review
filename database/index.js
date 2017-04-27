var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  html_url: String,
  description: String,
  updated_at: Date
});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;