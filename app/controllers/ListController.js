const Boards = require('../models/Board');
const List = require('../models/List');
const Tasks = require('../models/Task');

class ListController {
    //[GET] /api/list/getData
    getData(req, res, next) {
        Boards.findOne({ _id: req.query.idBoard })
            .then((board) => {
                List.find({ _id: board.ArrayList })
                    .then((item) => {
                        //Clone array
                        let array = [...board.ArrayList];

                        //Sắp xếp theo mảng lưu ở board, tại vì khi find() thì mảng tự sắp theo _id
                        for (let i = 0; i < array.length; i++) {
                            for (let j = 0; j < item.length; j++) {
                                if (array[i] == item[j]._id.toString()) {
                                    array[i] = item[j];
                                }
                            }
                        }
                        res.json(array);
                    })
                    .catch(next);
            })
            .catch(next);
    }

    //[GET] /api/list/get
    get(req, res, next) {
        List.find({ _id: req.query._id })
            .then((item) => {
                //Clone array
                let array = [...req.query._id];

                //Sắp xếp theo mảng lưu ở List gửi lên, tại vì khi find() thì mảng tự sắp theo _id.
                for (let i = 0; i < array.length; i++) {
                    for (let j = 0; j < item.length; j++) {
                        if (array[i] == item[j]._id.toString()) {
                            array[i] = item[j];
                        }
                    }
                }
                res.json(array);
            })
            .catch(next);
    }

    //[POST] /api/list/create
    create(req, res, next) {
        List.create(req.body)
            .then((item) => {
                Boards.updateOne({ _id: req.body.idBoard }, { $push: { ArrayList: item._id.toString() } })
                    .then((e) => {
                        res.status(201).json(e);
                    })
                    .catch(next);
                res.status(201).json(item);
            })
            .catch(next);
    }

    //[PUT] /api/list/updateOne
    async updateOne(req, res) {
        const response = await List.updateOne({ _id: req.body._id }, req.body);
        res.status(201).json(response);
    }

    //[PUT] /api/list/sort
    async sort(req, res) {
        const list = await List.findOne({ _id: req.body._id });
        let typeSort = req.body.type === 'asc' ? 1 : -1;
        const listTask = await Tasks.find({ _id: list.listTask }).sort({ title: typeSort });
        let newListTask = [];
        listTask.forEach((task) => {
            newListTask.push(task._id.toString());
        });
        const addlist = await List.updateOne({ _id: req.body._id }, { $set: { listTask: newListTask } });
        res.json(addlist);
    }

    //[DELETE] /api/list/delete
    async deleteOne(req, res) {
        //Find list
        const listFind = await List.findOne({ _id: req.query._id });
        //Delete list tasks of list
        const listTaskDelete = await Tasks.deleteMany({ _id: listFind.listTask });
        //Delete list
        const deleteList = await List.deleteOne({ _id: listFind._id });
        //Update Array list
        const updateBoard = await Boards.updateOne(
            { _id: listFind.idBoard },
            { $pull: { ArrayList: listFind._id.toString() } },
        );
        res.json(updateBoard);
    }
}

module.exports = new ListController();
