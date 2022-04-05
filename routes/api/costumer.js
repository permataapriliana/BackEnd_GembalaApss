const express = require('express');
const router = express.Router();

const session = require(__module_dir + '/session.module.js');
const helper = require(__class_dir + '/helper.class.js');

const m$costumer = require(`${__module_dir}/costumer.module.js`);

router.get('/', async function (req, res, next) {
	const list = await m$costumer.listcostumer();
	helper.sendResponse(res, list);
});

router.post('/', async function (req, res, next) {
	const add = await m$costumer.addcostumer(req.body);
	helper.sendResponse(res, add);
});

router.get('/:id_cus', async function (req, res, next) {
	const detail = await m$costumer.getDetailcostumer(req.params.id_cus)
	helper.sendResponse(res, detail)
});

router.put('/:id_cus', async function (req, res, next) {
	// const update = await m$costumer.updatecostumer({
	// 	name: req.body.name,
	// 	date_birth: req.body.date_birth, 
	// 	position: req.body.position, 
	// }, req.params.id);
	const update = await m$costumer.updatecostumer({...req.body, id_cus: req.params.id_cus});
	helper.sendResponse(res, update);
});

router.delete('/:id_cus', async function (req, res, next) {
	const deletecostumer = await m$costumer.deletecostumer(req.params.id_cus);
	helper.sendResponse(res, deletecostumer);
});


// router.get('/list', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$costumer.listcostumer();
// 	helper.sendResponse(res, list);
// });

// router.get('/detail/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$costumer.listcostumer({ id: req.params.id });
// 	helper.sendResponse(res, list);
// });

// router.post('/add', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const add = await m$costumer.addcostumer(req.body);
// 	helper.sendResponse(res, add);
// });

// router.put('/update/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const update = await m$costumer.updatecostumer({...req.body, id: req.params.id});
// 	helper.sendResponse(res, update);
// });

// router.delete('/delete/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const deletecostumer = await m$costumer.deletecostumer(req.params.id);
// 	helper.sendResponse(res, deletecostumer);
// });

module.exports = router;