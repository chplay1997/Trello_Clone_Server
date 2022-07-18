const Tasks = require('../models/Task');
const List = require('../models/List');

class TaskController {
    //[GET] /api/tasks/getData
    getData(req, res, next) {
        List.findOne({ _id: req.query.idList })
            .then((item) => {
                Tasks.find({ _id: item.listTask })
                    .then((tasks) => {
                        //Clone array
                        let array = [...item.listTask];

                        //Sắp xếp theo mảng lưu ở List, tại vì khi find() thì mảng tự sắp theo _id
                        for (let i = 0; i < array.length; i++) {
                            for (let j = 0; j < tasks.length; j++) {
                                if (array[i] == tasks[j]._id.toString()) {
                                    array[i] = tasks[j];
                                }
                            }
                        }
                        res.json(array);
                    })
                    .catch(next);
            })
            .catch(next);
    }

    //[POST] /api/tasks/create
    create(req, res, next) {
        Tasks.create(req.body)
            .then((item) => {
                List.updateOne({ _id: req.body.idList }, { $push: { listTask: item._id.toString() } })
                    .then((e) => {
                        res.status(201).json(e);
                    })
                    .catch(next);
                res.status(201).json(item);
            })
            .catch(next);
    }
    //[PUT] /api/tasks/updateOne
    async updateOne(req, res, next) {
        const response = await Tasks.updateOne({ _id: req.body._id }, req.body);
        res.status(201).json(response);
    }

    //[DELETE] /api/list/deleteOne
    deleteOne(req, res) {
        let id = JSON.parse(req.query._id);
        console.log(id);
        Tasks.deleteOne({ _id: id.idTask })
            .then(() => {
                List.updateOne({ _id: id.idList }, { $pull: { listTask: id.idTask } })
                    .then((e) => {
                        res.json(e);
                    })
                    .catch(() => {});
            })
            .catch(() => {});
    }
}

module.exports = new TaskController();
