var app = require('./app').app;
const port = process.env.PORT || 3000;

// https://stackoverflow.com/a/32878895/4816922
if(!module.parent) {
  app.listen(port, function () {
    console.log(`App started on port ${port}`);
  });
}

module.exports = {
  app,
}