const express = require('express');
const router = express.Router();

const BoardController = require('../app/controllers/BoardController');

router.post('/create', BoardController.create);
router.get('/getAll', BoardController.getAll);
router.get('/getOne', BoardController.getOne);
router.put('/updateOne', BoardController.updateOne);
router.post('/createTemplate', BoardController.createTemplate);
router.delete('/deleteOne', BoardController.deleteOne);

module.exports = router;
