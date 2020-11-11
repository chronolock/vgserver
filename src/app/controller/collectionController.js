const CollecionDAO = require('../dao/collection-dao');
const db = require('../../config/database');

class CollectionController{
    static rotas = {
        add: '/collection',
        list: '/collection',
        getById: '/collection/:id'
    }

    static addColection(){
        return function(req, resp){
            const obj = req.body;
            if((obj.name == undefined) || (obj.cod == undefined)){
                resp.status(400).send('name e cod são parametros obrigatorios');
            } else {
                const collecitonDao = new CollecionDAO(db);
                collecitonDao.add(obj).then((lastId) => {
                    resp.status(200).send('{ collectionId: '+lastId+'}')
                })
            }
        }
    }

    static list(){
        return function(req, resp){
            const collectionDao = new CollecionDAO(db);
            collectionDao.list().then((result) => {
                resp.send(result);
            }).catch(err => console.log(err));
        }
    }

    static getById(){
        return function(req, resp){
            const collectionDao = new CollecionDAO(db);
            collectionDao.getById(req.params.id).then((result) => {
                resp.send(result);
            }).catch(err => console.log(err));
        }
    }
}

module.exports = CollectionController;