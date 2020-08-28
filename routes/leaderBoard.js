const router = require('express').Router();

const User = require('../models/user');

//get user with score
router.get('/', (req, res, next) => {
    User.find()
    .then(documents => {
        res.status(200).json({
            message: "Users Fetched Successfully",
            users: documents
        });
    })
    .catch(error => {
        res.status(500).json(
            {
                message: 'Failed to fetch Users',
                error: error
            }
        );
    });
});

module.exports = router;