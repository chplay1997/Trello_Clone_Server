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

                //Sắp xếp theo mảng lưu ở List gửi lên, tại vì khi find() thì mảng tự sắp theo _id
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

    //[DELETE] /api/list/delete
    deleteOne(req, res) {
        List.findOne({ _id: req.query._id })
            .then((item) => {
                Promise.all([
                    List.deleteOne({ _id: req.query._id }),
                    Tasks.deleteMany({ idList: req.query._id }),
                    Boards.updateOne({ _id: item.idBoard }, { $pull: { ArrayList: req.query._id } }),
                ])
                    .then((e) => {
                        res.json(e);
                    })
                    .catch(() => {});
            })
            .catch(() => {});
    }
}

module.exports = new ListController();
