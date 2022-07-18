const Boards = require('../models/Board');
const List = require('../models/List');
const Tasks = require('../models/Task');
const mongoose = require('mongoose');

class BoardsController {
    //[GET] /api/boards/getAll
    getAll(req, res, next) {
        Boards.find({})
            .then((board) => {
                res.json(board);
            })
            .catch(next);
    }

    //[GET] /api/boards/getOne
    getOne(req, res, next) {
        Boards.find({ _id: req.query._id })
            .then((board) => {
                res.json(board);
            })
            .catch(next);
    }

    //[POST] /api/boards/create
    async create(req, res, next) {
        const newBoard = await Boards.create(req.body);
        res.status(201).json(newBoard);
    }

    //[PUT] /api/boards/updateOne
    async updateOne(req, res) {
        const response = await Boards.updateOne({ _id: req.body._id }, req.body);
        res.status(201).json(response);
    }

    //[DELETE] /api/boards/deleteOne
    async deleteOne(req, res) {
        const board = await Boards.findOne({ _id: req.query._id });
        //Find list and delete tasks
        board.ArrayList.forEach(async (list) => {
            const listDelete = await List.findOne({ _id: list });
            const listTaskDelete = await Tasks.deleteMany({ _id: listDelete.listTask });
        });
        //delete list
        const listTaskDelete = await List.deleteMany({ _id: board.ArrayList });

        //delete board
        const response = await Boards.deleteOne({ _id: board._id });
        res.json(response);
    }

    //[POST] /api/boards/createTemplate
    async createTemplate(req, res) {
        const board = req.body.board;
        const list = req.body.list;
        const tasks = req.body.tasks;

        const boardCreate = await Boards.create({ name: board.name, image: board.image });
        list.forEach(async (item) => {
            let list = await List.create({ name: item.name, idBoard: boardCreate._id });
            let arrayList = await Boards.updateOne(
                { _id: boardCreate._id },
                { $push: { ArrayList: list._id.toString() } },
            );
            tasks.forEach(async (task) => {
                if (task.idList == item.id) {
                    let taskCreate = await Tasks.create({ title: task.title, idList: list._id });
                    let listTask = await List.updateOne(
                        { _id: list._id },
                        { $push: { listTask: taskCreate._id.toString() } },
                    );
                }
            });
        });
        res.json(boardCreate);
    }
}

module.exports = new BoardsController();
