// 引用express 與express路由器
const express = require('express')
const router = express.Router()
// 引用todo model
const Todo = require('../../models/todo')
// 定義首頁路由
router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' })
    //'asc' ascending 'desc' desscending
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

module.exports = router