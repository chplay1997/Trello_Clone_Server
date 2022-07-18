const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/trello_clone')
        console.log('Connect sucessfuly!!!');
    } catch (error) {
        console.log('Connect error');
    }
}

module.exports = { connect };