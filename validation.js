const { check, validationResult } = require('express-validator')
exports.signupvalidation = [
    check('fullname')
        .notEmpty()
        .withMessage('First Name is Required..!'),
    check('username')
        .notEmpty()
        .withMessage('Last Name is Required..!'),
    check('email')
        .isEmail()
        .withMessage('Plz Enter a Valid Email Address..'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be more than 6 characters')
];
exports.loginValidation = [
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })

];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.status(400).json({ errors: errors.array()[0].msg })
    }
    next()
};