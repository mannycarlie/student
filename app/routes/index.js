const jwt = require('jsonwebtoken');
const express = require('express');

const userRoutes = require('./api/user.router');
const studentRoutes=require('./api/student.router');
const courseRoutes=require('./api/course.router');

module.exports = ((app, router, passport) => {


    let auth = (req, res, next) => {
        let token = req.cookies.token;
        jwt.verify(token, "eed#ewtyeweBBsdsd", function (err, decoded) {
            if (err) {
                res.json({ success: false, message: 'Please login first' });
            } else {
                let user = decoded;
                req.user = user;
                next();
            }
        })
    };

    router.use((req, res, next) => {
        next();
    })

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    userRoutes(app, router, passport);
    studentRoutes(app, router, auth);
    courseRoutes(app, router, auth);
    
    app.use('/api', router);

    app.use('/', express.static('dist', { root: __dirname + "/../../" }));

    app.get('*', (req, res) => {
        res.sendFile('/dist/index.html', { root: __dirname + "/../../" });
    });

})