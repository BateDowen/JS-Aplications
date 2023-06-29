const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../../modules/User');
const { catchError } = require('./dash');


exports.register = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error('Vallidation fail');
        err.statusCode = 422;
        throw err;

    }
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password,12)
        .then(hashedPass =>{
            const user = new User({
                email,
                password: hashedPass
            })
            return user.save()
        })
        .then(result =>{
            res.status(201).json({message: 'User created', userId: result._id})
        })
        .catch(err =>{
            catchError(err,next)
        })
}