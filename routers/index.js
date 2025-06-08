const express = require("express");
const Controller = require("../controllers");
const UserController = require("../controllers/userController");
const router = express.Router();
const session = require('express-session')

// router.get('/login', UserController.loginPage)
// router.post('/login', UserController.postLogin)
// router.get('/register', UserController.registerForm)
// router.post('/register', UserController.postRegister)

// const isLoggedIn = (req, res, next) => {
//   console.log(req.session)
//   if(!req.session.userId){
//     res.redirect(`/login?error=Please+login`)
//   }else{
//     next()
//   }
//   }


// const isManager = (req, res, next) => {
//   console.log(req.session)
//   if(!req.session.role){
//     res.redirect(`/login?error=Please+login`)
//   }else{
//     next()
//   }
// }

// router.use(isLoggedIn)
router.get('/', Controller.dashboard)
router.post('/', Controller.redashboard)
router.get('/stocks/:id', Controller.editStock) // landing page buat semua stocks
router.get('/stocks/add/:id', Controller.addForm)
router.post('/stocks/add/:id', Controller.saveFormAdd)
router.get('/stocks/delete/:id', Controller.deleteStock)
router.get('/stocks/buy/:id', Controller.buyStockById)
router.get('/logout', UserController.getLogout)
// router.get('/stocks/', isManager, Controller.editStock)
// router.get('/stocks/edit/:id', Controller.rewriteStock)
// router.post('/stocks/edit/:id', Controller.addRewriteStock)

module.exports = router

