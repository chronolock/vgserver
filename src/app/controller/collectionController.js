const CollecionDAO = require('../dao/collection-dao');
const db = require('../../config/database');



class CollectionController {
    static get rotas() {
        return {
            add: '/collection',
            list: '/collection',
            getById: '/collection/:id',
            update: '/collection',
            delete: '/collection/:id',
        }
    }

    static addColection() {
        return function (req, resp) {
            const obj = req.body;
            if ((obj.name == undefined) || (obj.cod == undefined)) {
                resp.status(400).send('name e cod são parametros obrigatorios');
            } else {
                const collecitonDao = new CollecionDAO(db);
                collecitonDao.add(obj).then((lastId) => {
                    resp.status(200).send('{ collectionId: ' + lastId + '}')
                })
            }
        }
    }

    static updateCollecion() {
        return function (req, resp) {
            const obj = req.body;
            if ((obj.id == undefined) || (obj.name == undefined) || (obj.cod == undefined)) {
                resp.status(400).send('name e cod são parametros obrigatorios');
            } else {
                const collecitonDao = new CollecionDAO(db);
                collecitonDao.update(obj).then((changes) => {
                    if (changes == 1) {
                        collecitonDao.getById(obj.id).then(result => {
                            resp.setHeader("Content-Type", "application/json");
                            resp.status(200).send(result.toJson())
                        })
                    } else {
                        resp.status(404).send('Não encontrei coleção para atualizar nesse ID');
                    }
                })
            }
        }
    }

    static deleteCollecion() {
        return function (req, resp) {
            const collectionDao = new CollecionDAO(db);
            const objId = req.params.id;
            collectionDao.getById(objId).then(result => {
                collectionDao.delete(req.params.id).then(changes => {
                    resp.send(result)
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }
    }

    static list() {
        return function (req, resp) {
            const collectionDao = new CollecionDAO(db);
            collectionDao.list().then((result) => {
                resp.send(result);
            }).catch(err => console.log(err));
        }
    }

    static getById() {
        return function (req, resp) {
            const collectionDao = new CollecionDAO(db);
            collectionDao.getById(req.params.id).then((result) => {
                resp.send(result.toJson());
            }).catch(err => console.log(err));
        }
    }
}

module.exports = CollectionController;