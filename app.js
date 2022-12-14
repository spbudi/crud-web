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

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('index', { data })
})

app.get('/add', (req, res) => {
  res.render('add')
})

app.post('/add', (req, res) => {
  data.push({string: req.body.string, integer: parseInt(req.body.integer), float: parseFloat(req.body.float), date: req.body.date, boolean: req.body.boolean})
  fs.writeFileSync('db.json', JSON.stringify(data))
  res.redirect('/')
})

app.get('/delete/:id', (req, res) => {
  const id = req.params.id
  data.splice(id, 1)
  fs.writeFileSync('db.json', JSON.stringify(data))
  res.redirect('/')
})

app.get('/edit/:id', (req, res) => {
  const id = req.params.id
  res.render('edit', {item: data[id], index: parseInt(id)})
})

app.post('/edit/:id', (req, res) => {
  const id = req.params.id
  data[id] = {string: req.body.string, integer: parseInt(req.body.integer), float: parseFloat(req.body.float), date: req.body.date, boolean: req.body.boolean}
  fs.writeFileSync('db.json', JSON.stringify(data))
  res.redirect('/')
})

// app.get('/edit/:id', (req, res) => {
//   res.render('edit', {item: data[req.params.id], index: parseInt(req.params.id)})
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})