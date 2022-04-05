var express = require('express');
var router = express.Router();
const session = require(__module_dir+'/session.module.js');

router.get('/', function(req, res, next) {
	res.render('pages/login', { title: 'Express' });
});

router.post('/', session.loginValidation);

router.post('/register', async function (req, res, next) {
	const save = await session.registerUser(req.body);

	res.send(save);
});

router.post('/verify', session.sessionChecker, async function (req, res, next) {
	const save = req.decoded;

	res.send(save);
});

router.get('/logout', session.logout);

module.exports = router;
