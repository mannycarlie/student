
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user.model');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    passport.use('local-signin', new LocalStrategy({

        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true

    }, (req, username, password, done) => {

        User.findOne({
            'username': username
        }, (err, user) => {
            if (err)
                return done(err);
            if (!user) {

                return done(null, false, {
                    loginMessage: 'That user was not found. ' +
                        'Please enter valid user credentials.'
                }
                );
            }
            if (!user.validPassword(password))
                return done(null, false, { loginMessage: 'Invalid password entered.' });

                return done(null, user);
        });
    }));




    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },

        (req, username, password, done) => {

            process.nextTick(() => {
                User.findOne({ 'username': req.body.username }, (err, user) => {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null,
                            false,
                            {
                                signupMessage: 'That username is already ' +
                                    'taken.'
                            }
                        );

                    } else {
                        let newUser = new User();
                        newUser.username = req.body.username.toLowerCase();
                        newUser.usertype=req.body.usertype,
                        newUser.password = newUser.generateHash(password);
                        newUser.save((err) => {
                            if (err)
                                throw err;

                            return done(null, newUser);
                        });
                    }
                });
            });
        }));
};
