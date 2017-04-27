var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  id: {type: Number, unique: true, required: true, dropDups: true},
  username: String,
  name: String,
  html_url: String,
  description: String,
  updated_at: Date
});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;