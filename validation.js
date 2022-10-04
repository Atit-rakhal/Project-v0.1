const { check, validationResult } = require('express-validator')
exports.signupvalidation = [
    check('fullname')
        .notEmpty()
        .withMessage('Full Name is Required..!'),
    check('username')
        .notEmpty()
        .withMessage('User Name is Required..!'),
    check('email')
        .isEmail()
        .withMessage('Enter a Valid Email Address..'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be more than 6 characters')
];
exports.loginvalidation = [
    check('email')
    .isEmail()
    .withMessage('Enter a Valid Email Address..'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be more than 6 characters')

];

exports.isrequestvalidated = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.status(400).json({ errors: errors.array()[0].msg })
    }
    next()
};