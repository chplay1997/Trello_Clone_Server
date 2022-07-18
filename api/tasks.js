const express = require('express');
const router = express.Router();

const TaskController = require('../app/controllers/TaskController');

router.get('/getData', TaskController.getData);
router.post('/create', TaskController.create);
router.put('/updateOne', TaskController.updateOne);
router.delete('/deleteOne', TaskController.deleteOne);
module.exports = router;
