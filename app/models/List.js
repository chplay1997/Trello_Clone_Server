const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema(
    {
        idBoard: { type: String, required: true },
        name: { type: String, maxLength: 125, required: true },
        listTask: { type: Array, required: true },
    },
    {
        //tu dong tao thoi gian update va create data
        timestamps: true,
    },
);

module.exports = mongoose.model('List', ListSchema, 'list');
