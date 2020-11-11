const CardsDAO = require('../dao/cards-dao');
const db = require('../../config/database');

class CardController{

    static rotas = {
        add: '/cards',
        list: '/cards',
        getById: '/cards/:id',
        update: '/cards',
        delete: '/cards/:id'
    }

    static addCard(){
        return function(req, resp){
            const obj = req.body;
            if((obj.clanId == undefined) || (obj.collectionId == undefined) || (obj.name == undefined) ||  (obj.grade == undefined)){
                resp.status(400).send('name e cod são parametros obrigatorios');
            } else {
                const cardsDao = new CardsDAO(db);
                cardsDao.add(obj).then((lastId) => {
                    resp.status(200).send('{ cardId: '+lastId+'}')
                }).catch((err) => {
                    console.log(err);
                    resp.status(500).send(err);
                })
            }
        }
    }

    static updateCard(){
        return function(req, resp){
            const obj = req.body;
            const cardsDao = new CardsDAO(db);
            cardsDao.update(obj).then((changes) => {
                if(changes == 1){
                    cardsDao.getById(obj.id).then( result => {
                        resp.setHeader("Content-Type","application/json");
                        resp.status(200).send(result.toJson())
                    })
                } else {
                    resp.status(404).send('Não encontrei carta para atualizar nesse ID');
                }
                
            }).catch((err) => {
                console.log(err);
                resp.status(500).send(err);
            })
        }
    }

    static deleteCard(){
        return function(req, resp){
            const obj = req.params.id;
            const cardsDao = new CardsDAO(db);
            cardsDao.delete(obj).then((deletedObject) => {
                resp.setHeader("Content-Type","application/json");
                resp.status(200).send(deletedObject.toJson());                
            }).catch((err) => {
                console.log(err);
                resp.status(500).send(err);
            })
        }
    }

    static list(){
        return function(req, resp){
            const cardsDao = new CardsDAO(db);
            cardsDao.list().then((result) => {
                resp.send(result);
            }).catch(err => console.log(err));
        }
    }

    static getById(){
        return function(req, resp){
            const cardsDao = new CardsDAO(db);
            cardsDao.getById(req.params.id).then((result) => {
                resp.setHeader("Content-Type","application/json");
                resp.send(result.toJson());
            }).catch(err => console.log(err));
        }
    }
}

module.exports = CardController;