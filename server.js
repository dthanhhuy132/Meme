import express from 'express'

const app = express()

app.set('view engine', 'ejs')
app.set('app', './src/index.js')
app.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.get('/', function (req, res) {
  res.send('Hello Word')
})
