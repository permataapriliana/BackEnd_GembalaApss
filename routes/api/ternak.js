const express = require('express');
const router = express.Router();

const session = require(__module_dir + '/session.module.js');
const helper = require(__class_dir + '/helper.class.js');

const m$ternak = require(`${__module_dir}/ternak.module.js`);

// router.get('/', async function (req, res, next) {
// 	const list = await m$ternak.listternak();
// 	helper.sendResponse(res, list);
// });

router.post('/', async function (req, res, next) {
	const add = await m$ternak.addternak(req.body);
	helper.sendResponse(res, add);
});

router.get('/:id_ternak', async function (req, res, next) {
	const detail = await m$ternak.getDetailternak(req.params.id_ternak)
	helper.sendResponse(res, detail)
});

// router.put('/:id_ternak', async function (req, res, next) {
// 	// const update = await m$ternak.updateternak({
// 	// 	name: req.body.name,
// 	// 	date_birth: req.body.date_birth, 
// 	// 	position: req.body.position, 
// 	// }, req.params.id);
// 	const update = await m$ternak.updateternak({...req.body, id_ternak: req.params.id_ternak});
// 	helper.sendResponse(res, update);
// });

// router.delete('/:id_ternak', async function (req, res, next) {
// 	const deleteternak = await m$ternak.deleteternak(req.params.id_ternak);
// 	helper.sendResponse(res, deleteternak);
// });

/////////////////////////////////////////////////

// router.get('/list', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$ternak.listternak();
// 	helper.sendResponse(res, list);
// });

// router.get('/detail/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$ternak.listternak({ id: req.params.id });
// 	helper.sendResponse(res, list);
// });

// router.post('/add', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const add = await m$ternak.addternak(req.body);
// 	helper.sendResponse(res, add);
// });

// router.put('/update/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const update = await m$ternak.updateternak({...req.body, id: req.params.id});
// 	helper.sendResponse(res, update);
// });

// router.delete('/delete/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const deleteternak = await m$ternak.deleteternak(req.params.id);
// 	helper.sendResponse(res, deleteternak);
// });

module.exports = router;