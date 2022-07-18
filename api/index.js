const boardsApi = require('./boards');
const listApi = require('./list');
const tasksApi = require('./tasks');

function api(app) {
    //patch
    app.use('/api/boards', boardsApi);
    app.use('/api/list', listApi);
    app.use('/api/tasks', tasksApi);
}

module.exports = api;
