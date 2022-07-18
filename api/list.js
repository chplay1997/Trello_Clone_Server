const express = require('express');
const router = express.Router();

const ListController = require('../app/controllers/ListController');
router.post('/create', ListController.create);
router.get('/getData', ListController.getData);
router.get('/get', ListController.get);
router.put('/updateOne', ListController.updateOne);
router.put('/sort', ListController.sort);
router.delete('/deleteOne', ListController.deleteOne);

module.exports = router;
