const express = require('express')
const exshbs = require('express-handlebars')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')
// 將request 導入路由器
// 默認會去找/routes目錄下index的檔案

// 載入 mongoose
require('./config/mongoose')

app.engine('hbs', exshbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))
app.use(routes)

app.listen(4000, () => {

  console.log('express is running on http://localhost:3000')
})