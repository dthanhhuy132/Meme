import express from 'express'

const app = express()

app.set('view engine', 'ejs')
app.set('app', './src/index.js')
app.listen(process.env.PORT || 3000)

app.get('/', function (req, res) {
  res.send('Hello Word')
})
