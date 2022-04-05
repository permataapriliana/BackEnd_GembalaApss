const express = require('express');
const router = express.Router();

const session = require(__module_dir + '/session.module.js');
const helper = require(__class_dir + '/helper.class.js');

const m$penjualan = require(`${__module_dir}/penjualan.module.js`);

router.get('/', async function (req, res, next) {
	const list = await m$penjualan.listpenjualan();
	helper.sendResponse(res, list);
});

router.post('/', async function (req, res, next) {
	const add = await m$penjualan.addpenjualan(req.body);
	helper.sendResponse(res, add);
});

router.get('/:id_penjualan', async function (req, res, next) {
	const detail = await m$penjualan.getDetailpenjualan(req.params.id_penjualan)
	helper.sendResponse(res, detail)
});

router.put('/:id_penjualan', async function (req, res, next) {
	// const update = await m$penjualan.updatepenjualan({
	// 	name: req.body.name,
	// 	date_birth: req.body.date_birth, 
	// 	position: req.body.position, 
	// }, req.params.id);
	const update = await m$penjualan.updatepenjualan({...req.body, id_penjualan: req.params.id_penjualan});
	helper.sendResponse(res, update);
});

router.delete('/:id_penjualan', async function (req, res, next) {
	const deletepenjualan = await m$penjualan.deletepenjualan(req.params.id_penjualan);
	helper.sendResponse(res, deletepenjualan);
});


// router.get('/list', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$penjualan.listpenjualan();
// 	helper.sendResponse(res, list);
// });

// router.get('/detail/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$penjualan.listpenjualan({ id: req.params.id });
// 	helper.sendResponse(res, list);
// });

// router.post('/add', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const add = await m$penjualan.addpenjualan(req.body);
// 	helper.sendResponse(res, add);
// });

// router.put('/update/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const update = await m$penjualan.updatepenjualan({...req.body, id: req.params.id});
// 	helper.sendResponse(res, update);
// });

// router.delete('/delete/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const deletepenjualan = await m$penjualan.deletepenjualan(req.params.id);
// 	helper.sendResponse(res, deletepenjualan);
// });

module.exports = router;




// Kelompok 6
// 1. Bima - 2202077
// 2. Dany Widiyanto - 2202081
// 3. Dede Septa Maulana Fajar - 2202069 
// 4. Dian Permata Apriliana Dewi-2202087
// 5. sem abraham - 2202071


