const express = require('express');
const app = express();
const helmet = require('helmet');

//Protect the page with helmet options
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());

//Set secure access requirement for 90 days 
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({maxAge: ninetyDaysInSeconds, force: true}))

//Additional Helmet protections
app.use(helmet({
  frameguard: {
    action: 'deny'
  },
  contentSecurityPolicy: {
    directives: {defaultSrc: ["'self'"], scriptSrc: ["'self'", "trusted-cdn.com"]}
  }, 
  dnsPrefetchControl: false,
  noCache: true,
}));










































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
