const express = require('express');
const router = express.Router();

const session = require(__module_dir + '/session.module.js');
const helper = require(__class_dir + '/helper.class.js');

const m$pakan = require(`${__module_dir}/pakan.module.js`);

router.get('/', async function (req, res, next) {
	const list = await m$pakan.listpakan();
	helper.sendResponse(res, list);
});

router.post('/', async function (req, res, next) {
	const add = await m$pakan.addpakan(req.body);
	helper.sendResponse(res, add);
});

router.get('/:id_pakan', async function (req, res, next) {
	const detail = await m$pakan.getDetailpakan(req.params.id_pakan)
	helper.sendResponse(res, detail)
});

router.put('/:id_pakan', async function (req, res, next) {
	// const update = await m$pakan.updatepakan({
	// 	name: req.body.name,
	// 	date_birth: req.body.date_birth, 
	// 	position: req.body.position, 
	// }, req.params.id);
	const update = await m$pakan.updatepakan({...req.body, id_pakan: req.params.id_pakan});
	helper.sendResponse(res, update);
});

router.delete('/:id_pakan', async function (req, res, next) {
	const deletepakan = await m$pakan.deletepakan(req.params.id_pakan);
	helper.sendResponse(res, deletepakan);
});


// router.get('/list', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$pakan.listpakan();
// 	helper.sendResponse(res, list);
// });

// router.get('/detail/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$pakan.listpakan({ id: req.params.id });
// 	helper.sendResponse(res, list);
// });

// router.post('/add', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const add = await m$pakan.addpakan(req.body);
// 	helper.sendResponse(res, add);
// });

// router.put('/update/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const update = await m$pakan.updatepakan({...req.body, id: req.params.id});
// 	helper.sendResponse(res, update);
// });

// router.delete('/delete/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const deletepakan = await m$pakan.deletepakan(req.params.id);
// 	helper.sendResponse(res, deletepakan);
// });

module.exports = router;