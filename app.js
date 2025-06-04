const express = require('express')
const router = require('./routers')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use (router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})