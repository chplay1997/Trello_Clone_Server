const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        idList: { type: String, required: true },
        title: { type: String, maxLength: 255, required: true },
        description: { type: String, maxLength: 600 },
    },
    {
        //tu dong tao thoi gian update va create data
        timestamps: true,
    },
);

module.exports = mongoose.model('Task', TaskSchema);
