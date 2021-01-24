const express = require('express')
const app = express()
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

app.get('/', (req, res) => {

  res.send('hello word!!!!!!!!')
})

app.listen(3000, () => {

  console.log('express is running on http://localhost:3000')
})