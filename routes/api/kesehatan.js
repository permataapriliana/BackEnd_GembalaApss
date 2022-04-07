const express = require('express');
const router = express.Router();

const session = require(__module_dir + '/session.module.js');
const helper = require(__class_dir + '/helper.class.js');

const m$kesehatan = require(`${__module_dir}/kesehatan.module.js`);

router.get('/', async function (req, res, next) {
	const list = await m$kesehatan.listkesehatan();
	helper.sendResponse(res, list);
});

router.post('/', async function (req, res, next) {
	const add = await m$kesehatan.addkesehatan(req.body);
	helper.sendResponse(res, add);
});

router.get('/:id_kesehatan', async function (req, res, next) {
	const detail = await m$kesehatan.getDetailkesehatan(req.params.id_kesehatan)
	helper.sendResponse(res, detail)
});

router.put('/:id_kesehatan', async function (req, res, next) {
	// const update = await m$kesehatan.updatekesehatan({
	// 	name: req.body.name,
	// 	date_birth: req.body.date_birth, 
	// 	position: req.body.position, 
	// }, req.params.id);
	const update = await m$kesehatan.updatekesehatan({...req.body, id_kesehatan: req.params.id_kesehatan});
	helper.sendResponse(res, update);
});

router.delete('/:id_kesehatan', async function (req, res, next) {
	const deletekesehatan = await m$kesehatan.deletekesehatan(req.params.id_kesehatan);
	helper.sendResponse(res, deletekesehatan);
});


// router.get('/list', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$kesehatan.listkesehatan();
// 	helper.sendResponse(res, list);
// });

// router.get('/detail/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$kesehatan.listkesehatan({ id: req.params.id });
// 	helper.sendResponse(res, list);
// });

// router.post('/add', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const add = await m$kesehatan.addkesehatan(req.body);
// 	helper.sendResponse(res, add);
// });

// router.put('/update/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const update = await m$kesehatan.updatekesehatan({...req.body, id: req.params.id});
// 	helper.sendResponse(res, update);
// });

// router.delete('/delete/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const deletekesehatan = await m$kesehatan.deletekesehatan(req.params.id);
// 	helper.sendResponse(res, deletekesehatan);
// });

module.exports = router;