const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');

//admin signup
router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {

            Admin.findOne({ username: req.body.username })
                .then(user => {
                    if (user) {
                        res.status(200).json({
                            status: false,
                            message: 'Username already exits'
                        });
                    }
                    else {
                        const user = new Admin({
                            username: req.body.username,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                res.status(200).json({
                                    status: true,
                                    message: 'New User Created',
                                    result: result
                                });
                            })
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'Invalid Authemtication credentials'
                    });
                });
        });
});

//  admin login
router.post('/login', (req, res, next) => {
    let fetchedUser;
    Admin.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(201).json({
                    status: false,
                    message: 'Auth failed'
                });
            }
            fetchedUser = user;
            console.log(fetchedUser);
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(201).json({
                    status: false,
                    message: "Auth failed"
                });
            }
            const token = jwt.sign(
                { username: fetchedUser.username, userId: fetchedUser._id },
                "JWT_Auth_Token_Secret",
                { expiresIn: "1d" }
            );
            res.status(200).json({
                status: true,
                token: token,
                username: fetchedUser.username,
                expiresIn: 1800
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: 'Invalid Authemtication credentials'
            });
        });
});

module.exports = router;