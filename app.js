const express = require('express')
var bodyParser = require('body-parser')
const path = require('path')
const app = express()
const fs = require('fs')
var db = fs.readFileSync('db.json', 'utf-8')
var data = JSON.parse(db)
const port = 3000

app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('index', { data })
})

app.get('/add', (req, res) => {
  res.render('add')
})

app.post('/add', (req, res) => {
  data.push({string: req.body.string, integer: parseInt(req.body.integer), float: parseFloat(req.body.float), date: req.body.date, boolean: JSON.parse(req.body.boolean)})
  fs.writeFileSync('db.json', JSON.stringify(data))
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})