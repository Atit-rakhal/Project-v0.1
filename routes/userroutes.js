const express = require('express');
const router = express();
const { signupvalidation,loginvalidation, isRequestValidated } = require('../validation.js');
const bodyparser = require('body-parser');
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({extended: true}));

const usercontroller = require("../controllers/usercontroller");


router.post('/register',signupvalidation,isRequestValidated,usercontroller.registeruser);


router.post('/login',loginvalidation,isRequestValidated,usercontroller.loginuser);


module.exports = router