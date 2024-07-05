const express = require('express');
const router = express.Router();
const { authentication, authorization } = require('../middlewares/auth')
const { userSignIn, userLogin } = require('../controllers/userController');
const { addTopic, dashboard } = require('../controllers/topicController');


//----------------------------- User's API -----------------------------//

router.post('/register', userSignIn)
router.post('/login', userLogin)
router.post('/user/:userId/addtopic', authentication, authorization, addTopic)
router.get('/user/:userId/dashboard', authentication, authorization, dashboard)


//----------------------------- For invalid end URL -----------------------------//

router.all('/**', function (req, res) {
    return res.status(400).send({ status: false, message: "Invalid http request" })
})

module.exports = router; 