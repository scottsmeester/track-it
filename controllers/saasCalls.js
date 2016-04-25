var Config = require('../config.js'),
    User = require('../models/userModel.js'),
    rest = require('restler'),
    callOptions


var saasController = {
  getSFContacts: function(req, res){
    // console.log('req.user', req.user)
    User.findOne({_id: req.user._id}, function(err, results){
      // console.log('results', results);
      callOptions = {
        'query': 'q=SELECT%20name%20from%20Account',
        'method': 'GET',
        'headers': {
          "authorization": "Bearer " + results.sf_access_token,
          "cache-control": "no-cache",
          "postman-token": "b185db86-f2b0-236f-c055-904acf8938e3"
        }
      }
      // console.log('callOptions', callOptions);
      rest.get('https://na16.salesforce.com/services/data/v20.0/query', callOptions).on('complete', function(result) {
        if (result instanceof Error) {
          console.log('Error:', result.message);
          this.retry(5000); // try again after 5 sec
        } else {
          console.log(result);
        }
      });
    })
    // console.log('Rest', Rest)
    // console.log('getting to call')
    // rest('/').then(function(response) {
    //     console.log('response: ', response);
    //     res.send(response.entity)
    // });
    // rest.api(req).query("select id, name from account limit 10", function(data) {
    //   console.log('res', res);
    //     // res.render("accounts", { title: 'Accounts', data: data, user: req.session.identity } );
    //   });
  },
  getSFOpporunities: function(req, res){

  },
  getSFAccounts: function(req, res){
    
  }
}

module.exports = saasController;