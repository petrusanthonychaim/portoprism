const {
    User 
} = require('../models')
const session = require('express-session')
const bcrypt = require('bcryptjs')
class UserController { 
    
    static loginPage(req, res){
        res.render("formLogin", { query: req.query });
    }

    static registerForm(req, res){
        res.render('formRegister')
    }

    static postRegister(req, res){
        let {email, password, role} = req.body;
        User.create({
            email,
            password,
            role
        })
        .then(newUser => {
            res.redirect('/login')
        })
        .catch(err => res.send(err))

    }

    static postLogin(req, res){
        let {email, password} = req.body;

        User.findOne({where : {email}})
        .then(user => {
            if(user){
                const isValidPassword = bcrypt.compareSync(password, user.password);
                if(isValidPassword){
                    req.session.userId = user.id
                    // req.session.role = user.role
                    return res.redirect('/')
                }else{
                    return res.redirect('/login?error=Password%20invalid')
                }
            }else{
                return res.redirect('/login?error=User%20not%20found');
            }
        })
        .catch(err => res.send(err))
    }

    static getLogout(req, res){
       req.session.destroy((err) => {
        if(err) res.send(err)
         else{
        res.redirect('/login')
        }   
       })
    }

}

module.exports = UserController;