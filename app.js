const express = require('express')
const app = express()

app.get('/', (req, res) => {

  res.send('hello word!!!!!!!!')
})

app.listen(3000, () => {

  console.log('express is running on http://localhost:3000')
})