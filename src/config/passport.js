const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/User')

passport.use(new LocalStrategy({
    usernameField: 'user'
}, async (user, password, done) => {
    const userLog = await User.findOne({user: user});
    if (!userLog) {
        return done(null, false, {message: 'User not Found.'});
    }else{
        const match = await userLog.matchPassword(password);
        if (match) {
            return done(null, userLog);
        }else{
            return done(null, false, {message: 'Incorrect Password'});
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
})