const express = require('express');
const router = express.Router();

const session = require(__module_dir + '/session.module.js');
const helper = require(__class_dir + '/helper.class.js');

const m$stok = require(`${__module_dir}/stok.module.js`);

router.get('/', async function (req, res, next) {
	const list = await m$stok.liststok();
	helper.sendResponse(res, list);
});

router.post('/', async function (req, res, next) {
	const add = await m$stok.addstok(req.body);
	helper.sendResponse(res, add);
});

router.get('/:id_stock', async function (req, res, next) {
	const detail = await m$stok.getDetailstok(req.params.id_stock)
	helper.sendResponse(res, detail)
});

router.put('/:id_stock', async function (req, res, next) {
	// const update = await m$stok.updatestok({
	// 	name: req.body.name,
	// 	date_birth: req.body.date_birth, 
	// 	position: req.body.position, 
	// }, req.params.id);
	const update = await m$stok.updatestok({...req.body, id_stock: req.params.id_stock});
	helper.sendResponse(res, update);
});

router.delete('/:id_stock', async function (req, res, next) {
	const deletestok = await m$stok.deletestok(req.params.id_stock);
	helper.sendResponse(res, deletestok);
});


// router.get('/list', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$stok.liststok();
// 	helper.sendResponse(res, list);
// });

// router.get('/detail/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$stok.liststok({ id: req.params.id });
// 	helper.sendResponse(res, list);
// });

// router.post('/add', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const add = await m$stok.addstok(req.body);
// 	helper.sendResponse(res, add);
// });

// router.put('/update/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const update = await m$stok.updatestok({...req.body, id: req.params.id});
// 	helper.sendResponse(res, update);
// });

// router.delete('/delete/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const deletestok = await m$stok.deletestok(req.params.id);
// 	helper.sendResponse(res, deletestok);
// });

module.exports = router;