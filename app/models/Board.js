const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema(
    {
        name: { type: String, maxLength: 125, required: true },
        image: { type: String, maxLength: 125 },
        ArrayList: { type: Array, required: true },
    },
    {
        //tu dong tao thoi gian update va create data
        timestamps: true,
    },
);

module.exports = mongoose.model('Board', BoardSchema);
