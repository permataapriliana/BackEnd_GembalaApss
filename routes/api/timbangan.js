const express = require('express');
const router = express.Router();

const session = require(__module_dir + '/session.module.js');
const helper = require(__class_dir + '/helper.class.js');

const m$timbangan = require(`${__module_dir}/timbangan.module.js`);

router.get('/', async function (req, res, next) {
	const list = await m$timbangan.listtimbangan();
	helper.sendResponse(res, list);
});

router.post('/', async function (req, res, next) {
	const add = await m$timbangan.addtimbangan(req.body);
	helper.sendResponse(res, add);
});

router.get('/:id_timbangan', async function (req, res, next) {
	const detail = await m$timbangan.getDetailtimbangan(req.params.id_timbangan)
	helper.sendResponse(res, detail)
});

router.put('/:id_timbangan', async function (req, res, next) {
	// const update = await m$timbangan.updatetimbangan({
	// 	name: req.body.name,
	// 	date_birth: req.body.date_birth, 
	// 	position: req.body.position, 
	// }, req.params.id);
	const update = await m$timbangan.updatetimbangan({...req.body, id_timbangan: req.params.id_timbangan});
	helper.sendResponse(res, update);
});

router.delete('/:id_timbangan', async function (req, res, next) {
	const deletetimbangan = await m$timbangan.deletetimbangan(req.params.id_timbangan);
	helper.sendResponse(res, deletetimbangan);
});


// router.get('/list', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$timbangan.listtimbangan();
// 	helper.sendResponse(res, list);
// });

// router.get('/detail/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$timbangan.listtimbangan({ id: req.params.id });
// 	helper.sendResponse(res, list);
// });

// router.post('/add', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const add = await m$timbangan.addtimbangan(req.body);
// 	helper.sendResponse(res, add);
// });

// router.put('/update/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const update = await m$timbangan.updatetimbangan({...req.body, id: req.params.id});
// 	helper.sendResponse(res, update);
// });

// router.delete('/delete/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const deletetimbangan = await m$timbangan.deletetimbangan(req.params.id);
// 	helper.sendResponse(res, deletetimbangan);
// });

module.exports = router;