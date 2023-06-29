const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../../modules/User');
const { catchError } = require('./dash');
const jwt = require('jsonwebtoken');
const secret = 'someSuperGoodSecret'

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
};

exports.login = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({email: email})
    .then(user =>{
        if (!user) {
            const err = new Error('User not found');
            err.statusCode = 401;
            throw err
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password)
    })
    .then(isEqual =>{
        if (!isEqual) {
            const err = new Error('Wrong password');
            err.statusCode = 401;
            throw err;
        }
        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        },secret,{
            expiresIn: '1h'
        });
        res.status(200).json({token: token, userId: loadedUser._id.toString()})
    })
    .catch(err =>{
        catchError(err,next)
    })
}