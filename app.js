const express = require('express')
const router = require('./routers')
const session = require('express-session')
const app = express()
const port = 3000

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use (router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})