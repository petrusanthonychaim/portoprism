const express = require("express");
const Controller = require("../controllers");
const UserController = require("../controllers/userController");
const router = express.Router();
const session = require('express-session')

router.get('/login', UserController.loginPage)
router.post('/login', UserController.postLogin)
router.get('/register', UserController.registerForm)
router.post('/register', UserController.postRegister)

router.get('/logout', UserController.getLogout);


  
  
router.use((req, res, next) => {
    console.log(req.session)
    if(!req.session.userId){
      res.redirect(`/login?error=Please+login`)
    }else{
      next()
    }
  
  })

router.get('/', Controller.dashboard)
router.get('/stocks', Controller.dashboard)

module.exports = router