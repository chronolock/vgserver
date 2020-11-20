
const ClanController = require('../controller/clanController');
const CardController = require('../controller/cardsController');
const CollectionController = require('../controller/collectionController');
const NationController = require('../controller/nationController');

module.exports = (app) => {

    app.get('/', function (req, resp) {
        resp.send(
            `
                <html>
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1> VGServer only REST </h1>
                    </body> 
                </html>
            `
        );
    });

    app.get(NationController.rotas.list, NationController.list());

    app.get(ClanController.rotas.list, ClanController.list());

    app.post(ClanController.rotas.add, ClanController.addClan());

    app.get(CollectionController.rotas.list, CollectionController.list());

    app.post(CollectionController.rotas.add, CollectionController.addColection());

    app.post(CollectionController.rotas.getById, CollectionController.getById);

    app.get(CardController.rotas.list, CardController.list());

    app.get(CardController.rotas.getById, CardController.getById());

    app.post(CardController.rotas.add, CardController.addCard());

    app.put(CardController.rotas.update, CardController.updateCard());

    app.delete(CardController.rotas.delete, CardController.deleteCard());
}