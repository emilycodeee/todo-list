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
    .sort({ _id: 'asc' })
    //'asc' ascending 'desc' desscending
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

// 取得新增頁面
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

// 取得特定todo
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

// 新增todo
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

// 進入修改頁
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

// 重新放入改值後的修改資料
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  // const name = req.body.name
  return Todo.findById(id)
    .then((todo) => {
      todo.name = name
      todo.isDone = isDone === 'on'
      // id (isDone==='on'){
      //   todo.isDone = true
      // }else{
      //   todo.isDone = false
      // }
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

// 刪除todo
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

app.listen(3000, () => {

  console.log('express is running on http://localhost:3000')
})