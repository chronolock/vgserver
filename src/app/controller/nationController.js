const NationDAO = require('../dao/nation-dao');
const db = require('../../config/database');

class NationController {
    static get rotas() {
        return {
            list: '/nation'
        }
    }

    static list() {
        return function (req, resp) {
            const nationDao = new NationDAO(db);
            nationDao.list().then((result) => {
                resp.send(result);
            });
        }
    }
}

module.exports = NationController;