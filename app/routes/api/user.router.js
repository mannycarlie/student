const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');

module.exports = ((app, router, passport) => {
    router.route('/user')
        .get((req, res) => {
            User.find()
                .exec((err, users) => {
                    if (err)
                        res.send(err)
                    else
                        res.json(users);
                })
        })


    router.post('/signin', (req, res, next) => {
        passport.authenticate('local-signin', (err, user, info) => {
            if (err)
                return next(err);
            if (!user) {
                return res.json({ message: info.loginMessage });
            }
            req.login(user, (err) => {
                if (err)
                    return next(err);

                res.status(200);
                let super_secret = "eed#ewtyeweBBsdsd";
                var usr = { _id: user._id, username:user.username, usertype:user.usertype }
                var token = jwt.sign(usr, super_secret, { expiresIn: 500 * 24 * 60 * 60 });
                res.cookie('token', token);
                res.json({
                    _id: user._id,
                    token: token,
                    username: user.username,
                    usertype:user.usertype
                });
            });

        })(req, res, next);
    });


    router.post('/signup', (req, res, next) => {
        passport.authenticate('local-signup', (err, user, info) => {
            if (err)
                return next(err);

            if (!user) {
                return res.json({ message: info.signupMessage })
            }

            res.json({ _id: user._id, message: "Signup successfully..." })
        })
            (req, res, next);
    });

})