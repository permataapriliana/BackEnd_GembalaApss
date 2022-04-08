const express = require('express');
const router = express.Router();

const session = require(__module_dir + '/session.module.js');
const helper = require(__class_dir + '/helper.class.js');

const m$kawin = require(`${__module_dir}/kawin.module.js`);

router.get('/', async function (req, res, next) {
	const list = await m$kawin.listkawin();
	helper.sendResponse(res, list);
});

router.post('/', async function (req, res, next) {
	const add = await m$kawin.addkawin(req.body);
	helper.sendResponse(res, add);
});

router.get('/:id_kawin', async function (req, res, next) {
	const detail = await m$kawin.getDetailkawin(req.params.id_kawin)
	helper.sendResponse(res, detail)
});

router.put('/:id_kawin', async function (req, res, next) {
	// const update = await m$kawin.updatekawin({
	// 	name: req.body.name,
	// 	date_birth: req.body.date_birth, 
	// 	position: req.body.position, 
	// }, req.params.id);
	const update = await m$kawin.updatekawin({...req.body, id_kawin: req.params.id_kawin});
	helper.sendResponse(res, update);
});

router.delete('/:id_kawin', async function (req, res, next) {
	const deletekawin = await m$kawin.deletekawin(req.params.id_kawin);
	helper.sendResponse(res, deletekawin);
});


// router.get('/list', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$kawin.listkawin();
// 	helper.sendResponse(res, list);
// });

// router.get('/detail/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$kawin.listkawin({ id: req.params.id });
// 	helper.sendResponse(res, list);
// });

// router.post('/add', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const add = await m$kawin.addkawin(req.body);
// 	helper.sendResponse(res, add);
// });

// router.put('/update/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const update = await m$kawin.updatekawin({...req.body, id: req.params.id});
// 	helper.sendResponse(res, update);
// });

// router.delete('/delete/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const deletekawin = await m$kawin.deletekawin(req.params.id);
// 	helper.sendResponse(res, deletekawin);
// });

module.exports = router;