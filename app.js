const express = require('express')
const exshbs = require('express-handlebars')
const app = express()
const bodyParser = require('body-parser')
const Todo = require('./models/todo')
// 載入 mongoose
const mongoose = require('mongoose')
// 連線至mongodb
// 執行至此行就會與資料庫連線
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exshbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name

  // const todo = New Todo ({name})
  // return todo.save()
  //     .then(()=> res.redirect('/'))
  //     .catch(error => console.log(error))


  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

app.listen(3000, () => {

  console.log('express is running on http://localhost:3000')
})