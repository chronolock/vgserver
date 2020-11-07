const ClanDAO = require('../dao/clan-dao');
const db = require('../../config/database');

class ClanController{
    
    static rotas = {
        add: '/clan',
        list: '/clan'
    }

    static addClan(){
        return function(req, resp){
            const obj = req.body;
            if((obj.name == undefined) || (obj.nationId == undefined)){
                resp.status(400).send('name e nationId são parametros obrigatorios');
            } else {
                const clanDao = new ClanDAO(db);
                clanDao.add(obj).then((lastId) => {
                    resp.send('{clanId: '+lastId+'}');
                });
            }
        }
    }

    static list(){
        return function(req, resp){
            const clanDao = new ClanDAO(db);
            clanDao.list().then((result) => {
                resp.send(result);
            });
        }
    }
}

module.exports = ClanController;