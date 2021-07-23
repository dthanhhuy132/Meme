import express from 'express'
const app = express()
let server = require('http').Server(app);

app.get('/', function (req, res) {
  res.send('Hello Word')
})

app.listen(process.env.PORT || 3000)
server.listen(port, function () {
  console.log("App is running on port " + port);
});