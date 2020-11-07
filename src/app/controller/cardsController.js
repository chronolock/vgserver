const CardsDAO = require('../dao/cards-dao');
const db = require('../../config/database');

class CardController{

    static rotas = {
        add: '/cards',
        list: '/cards'
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

    static list(){
        return function(req, resp){
            const cardsDao = new CardsDAO(db);
            cardsDao.list().then((result) => {
                resp.send(result);
            }).catch(err => console.log(err));
        }
    }
}

module.exports = CardController;