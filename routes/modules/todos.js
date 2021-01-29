const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')
// 取得新增頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 取得特定todo
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

// 新增todo
router.post('/', (req, res) => {
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
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

// 重新放入改值後的修改資料
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

module.exports = router
