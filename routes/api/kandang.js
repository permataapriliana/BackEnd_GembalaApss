const express = require('express');
const router = express.Router();

const session = require(__module_dir + '/session.module.js');
const helper = require(__class_dir + '/helper.class.js');

const m$kandang = require(`${__module_dir}/kandang.module.js`);

router.get('/', async function (req, res, next) {
	const list = await m$kandang.listkandang();
	helper.sendResponse(res, list);
});

router.post('/', async function (req, res, next) {
	const add = await m$kandang.addkandang(req.body);
	helper.sendResponse(res, add);
});

router.get('/:id_kandang', async function (req, res, next) {
	const detail = await m$kandang.getDetailkandang(req.params.id_kandang)
	helper.sendResponse(res, detail)
});

router.put('/:id_kandang', async function (req, res, next) {
	// const update = await m$kandang.updatekandang({
	// 	name: req.body.name,
	// 	date_birth: req.body.date_birth, 
	// 	position: req.body.position, 
	// }, req.params.id);
	const update = await m$kandang.updatekandang({...req.body, id_kandang: req.params.id_kandang});
	helper.sendResponse(res, update);
});

router.delete('/:id_kandang', async function (req, res, next) {
	const deletekandang = await m$kandang.deletekandang(req.params.id_kandang);
	helper.sendResponse(res, deletekandang);
});


// router.get('/list', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$kandang.listkandang();
// 	helper.sendResponse(res, list);
// });

// router.get('/detail/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$kandang.listkandang({ id: req.params.id });
// 	helper.sendResponse(res, list);
// });

// router.post('/add', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const add = await m$kandang.addkandang(req.body);
// 	helper.sendResponse(res, add);
// });

// router.put('/update/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const update = await m$kandang.updatekandang({...req.body, id: req.params.id});
// 	helper.sendResponse(res, update);
// });

// router.delete('/delete/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const deletekandang = await m$kandang.deletekandang(req.params.id);
// 	helper.sendResponse(res, deletekandang);
// });

module.exports = router;