const express = require('express');
const router = express();
const { signupvalidation,loginvalidation, isrequestvalidated } = require('../validation.js');
const { registeruser,loginuser} = require("../controllers/usercontroller");
const bodyparser = require('body-parser');
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({extended: true}));

const usercontroller = require("../controllers/usercontroller");


router.post('/register',signupvalidation,isrequestvalidated,registeruser);


router.post('/login',loginvalidation,isrequestvalidated,loginuser);

module.exports = router