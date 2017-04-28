import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

// When a user types in a GitHub username and submits the form, your app should:
  // Send a POST request to your express server
  // Your server should GET that user's repos from GitHub's API
  // Your server should then save the repos to the database

// When a user visits / refreshes your page, your app should:
  // GET the top (how will you determine top?) 25 repos in your express server's database
  // Take those repos and display them on the page

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

    this.search = this.search.bind(this);
    this.getRepos = this.getRepos.bind(this);
  }

  componentDidMount() {
    this.getRepos();
  }

  getRepos() {
    var context = this;

    $.ajax({
     type: 'GET',
     url: '/repos',
     contentType: "application/json",
     success: function(data) {
      var reposArr = JSON.parse(data);
      context.setState({
        repos: reposArr
      });
     },
     error: function(err) {
      console.log(err);
     }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    var context = this;

    $.ajax({
     type: 'POST',
     url: '/repos/import',
     data: JSON.stringify({username: term}),
     contentType: "application/json",
     success: function(data) {
      context.getRepos();
     },
     error: function(err) {
      console.log(err);
     }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));