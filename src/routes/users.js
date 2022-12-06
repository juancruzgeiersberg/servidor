const express = require('express');
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const {user, password, confirm_password, email} = req.body;
    const errors = [];
    if (user.length <= 0){
        errors.push({text: 'Please insert your user'});
    }
    if (password != confirm_password){
        errors.push({text: 'Password do not match'});
    }
    if (password < 4){
        errors.push({text: 'Password must be at least 4 characters'});
    }
    if (email.length <= 0){
        errors.push({text: 'Please insert your email'});
    }
    if (errors.length > 0){
        res.render('users/signup', {errors, user, password, confirm_password, email});
    }else{
        const emailUser = await User.findOne({email: email});
        const userNew = await User.findOne({user: user});
        if (emailUser) {
            errors.push({text: 'The Email is already in use'});
        }
        if (userNew){
            errors.push({text: 'The User is already in use'});
        }
        if (errors.length > 0){
            res.render('users/signup', {
                errors,
                user,
                email
            });
        }else{
            const newUser = new User({user, password, email});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Estás registrado');
            res.redirect('/users/signin');
        }
    }
});

router.get('/users/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
});

module.exports = router;