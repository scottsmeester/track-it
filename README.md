# track-it

### You will need a config.js file for Salesforce login in your root directory. It should contain:

```
var ids = {
salesforce: {
 consumerKey: '<<YOUR KEY>>',
 consumerSecret: '<<YOUR SECRET>>',
 callbackURL: "<<YOUR CALLBACK URL>>"
}
};

module.exports = ids;
```
