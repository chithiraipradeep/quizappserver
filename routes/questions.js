const router = require('express').Router();

const Question = require('../models/question');
const User = require('../models/user');

//get question
router.get('/', (req, res, next) => {
    Question.find()
        .then(documents => {
            res.status(200).json({
                message: "Questions Fetched Successfully",
                questions: documents
            });
        })
        .catch(error => {
            res.status(500).json(
                {
                    message: 'Failed to fetch Questions',
                    error: error
                }
            );
        });
});

//save question
router.post('', (req, res, next) => {
    const question = new Question({
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        answer: req.body.answer
    });
    question
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Question Added',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to Add Question'
            });
        });
});

//update question
router.post('/update', (req, res, next) => {
    const question = {
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        answer: req.body.answer
    };
    const id = req.body._id;
    Question
        .update({ _id: id }, { $set: question })
        .exec()
        .then(result => {
            res.status(201).json({
                status:true,
                message: 'Question Updated',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                status:false,
                message: 'Failed to Update Question'
            });
        });
});

//delete question
router.post('/delete', (req, res, next) => {
    const id = req.body.id;
    console.log(id);
    Question.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                status: true,
                message: 'Deleted Question Successfully!',
                result: result
            });
        })
        .catch(error => {
            res.status(201).json({
                status: false,
                message: 'Question not deleted'
            });
        });
});


router.post('/mark', (req, res, next) => {
    username = req.body.username;
    marks = req.body.marks;
    console.log(marks);
    User.updateOne(
        { username: username },
        { marks: marks }
    )
        .then(response => {
            res.status(200).json({
                message: 'Marks Updated',
                response: response
            });
        })
        .catch(error => {
            res.status(500).jsom({
                message: 'Update Failed',
                error: error
            });
        });
});

module.exports = router;