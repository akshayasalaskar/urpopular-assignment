const {Router} = require('express');
const SignUp = require('../controllers/SignUp');
const router = Router();
const login = require('../controllers/login');
const auth = require('../controllers/auth');

router.post('/signup', SignUp); //routing
router.post('/login',login);
router.post('/auth', auth)

module.exports = router;