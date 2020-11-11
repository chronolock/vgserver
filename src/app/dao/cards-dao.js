const ClanDAO = require('./clan-dao');
const CollectionDAO = require('./collection-dao');
const Card = require('../model/Cards');

class CardsDAO{

    constructor(db){
        this._db = db;
        this.LIST_ALL = 'SELECT * FROM cards';
        this.DELETE_CARD = `DELETE FROM cards WHERE id = ?`;
        this.ADD_CARD = `INSERT INTO cards(
            clanId, collectionId, seq, name, grade, 
            power, shield, critical, race, isCritical, 
            isDraw, isHeal, isFront, isStand, isSentinel, 
            triggerPower, isBoost, isIntercept, isTwinDrive,
            isTripleDrive, forceGift,accelGift,protectGift,
            imgUrl,cardFlavor,cardEffect, rarity) 
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        this.UPDATE_CARD = `
            UPDATE cards SET
            clanId = ?, 
            collectionId = ?, 
            seq = ?, 
            name = ?, 
            grade = ?, 
            power = ?, 
            shield = ?, 
            critical = ?, 
            race = ?, 
            isCritical = ?, 
            isDraw = ?, 
            isHeal = ?, 
            isFront = ?, 
            isStand = ?, 
            isSentinel = ?, 
            triggerPower = ?, 
            isBoost = ?, 
            isIntercept = ?, 
            isTwinDrive = ?,
            isTripleDrive = ?, 
            forceGift = ?,
            accelGift = ?,
            protectGift = ?,
            imgUrl = ?,
            cardFlavor = ?,
            cardEffect = ?, 
            rarity = ?
            WHERE
            id = ?
        `;
        this.GET_BY_ID = `SELECT * FROM cards WHERE id = ?`;
    }

    list(){
        return new Promise((resolve, reject) => {
            this._db.all(this.LIST_ALL, (err, result) => {
                if(err) return reject(err.message);
                return resolve(result);
            });
        })
    }

    delete(id){
        return new Promise((resolve, reject) => {
            console.log("ID "+id);
            this.getById(id).then(result => {
                const stmt = this._db.prepare(this.DELETE_CARD);
                stmt.run(id, err => {
                    if(err){
                        return reject('Erro ao deletar carta com id:' + id);
                    } else {
                        if(stmt.changes == 1){
                            return resolve(result)
                        }
                    }
                })
            }).catch(err => {
                return reject(err);
            })
        })
    }

    getById(id){
        return new Promise((resolve, reject) => {
            if(id == undefined){
                return reject('ID obrigatoria');
            }
            this._db.all(this.GET_BY_ID, [id], (err, result) => {
                if(err) return reject(err.message);
                const obj = result[0];
                if(result.length == 0){
                    return resolve(new Card());
                }
                return resolve(new Card(obj.id, obj.clanId, obj.collectionId, obj.seq, obj.name, obj.grade, 
                    obj.power, obj.shield, obj.critical, obj.race, obj.isCritical, 
                    obj.isDraw, obj.isHeal, obj.isFront, obj.isStand, obj.isSentinel, 
                    obj.triggerPower, obj.isBoost, obj.isIntercept, obj.isTwinDrive,
                    obj.isTripleDrive, obj.forceGift, obj.accelGift, obj.protectGift,
                    obj.imgUrl, obj.cardFlavor, obj.cardEffect, obj.rarity));
            })
        });
    }

    add({clanId, collectionId, seq, name, grade, 
        power, shield, critical, race, isCritical, 
        isDraw, isHeal, isFront, isStand, isSentinel, 
        triggerPower, isBoost, isIntercept, isTwinDrive,
        isTripleDrive, forceGift,accelGift,protectGift,
        imgUrl,cardFlavor,cardEffect, rarity}){

        const newCard = new Card(0, clanId, collectionId, seq, name, grade, 
            power, shield, critical, race, isCritical, 
            isDraw, isHeal, isFront, isStand, isSentinel, 
            triggerPower, isBoost, isIntercept, isTwinDrive,
            isTripleDrive, forceGift,accelGift,protectGift,
            imgUrl,cardFlavor,cardEffect, rarity);

        const refCard = new Card();

        return new Promise((resolve, reject) => {
            const preparedObject = this.prepareObject(refCard, newCard);

            if(preparedObject.error != null){
                return reject(preparedObject.error);
            } 

            const clanDao = new ClanDAO(this._db);
            const collecitonDao = new CollectionDAO(this._db);
            collecitonDao.checkCollection(collectionId).then((collectionOk) => {
                if(collectionOk){
                    clanDao.checkClan(clanId).then((clanOk) => {
                        if(clanOk){
                            const stmt = this._db.prepare(this.ADD_CARD);
                            const obj = preparedObject.result;
                            stmt.run([obj.clanId, obj.collectionId, obj.seq, obj.name, obj.grade, 
                                obj.power, obj.shield, obj.critical, obj.race, obj.isCritical, 
                                obj.isDraw, obj.isHeal, obj.isFront, obj.isStand, obj.isSentinel, 
                                obj.triggerPower, obj.isBoost, obj.isIntercept, obj.isTwinDrive,
                                obj.isTripleDrive, obj.forceGift, obj.accelGift, obj.protectGift,
                                obj.imgUrl, obj.cardFlavor, obj.cardEffect, obj.rarity], (err) =>{
                                if(err){
                                    console.log("Error ao inserir carta: \n"+err.message);
                                    return reject(err.message);
                                }
                                return resolve(stmt.lastID);
                            })
                        } else {
                            console.log("Error ao inserir carta: Clã não existe");
                            return reject("Clã não encontrado");
                        }
                    })
                } else {
                    console.log("Error ao inserir carta: Coleção não existe");
                    return reject("Coleção não encontrada");
                }
            })
        });
    }

    update({id, clanId, collectionId, seq, name, grade, 
        power, shield, critical, race, isCritical, 
        isDraw, isHeal, isFront, isStand, isSentinel, 
        triggerPower, isBoost, isIntercept, isTwinDrive,
        isTripleDrive, forceGift,accelGift,protectGift,
        imgUrl,cardFlavor,cardEffect, rarity}){

        return new Promise((resolve, reject) => {
            this.getById(id).then((obj) => {
                const upCard = new Card(0, clanId, collectionId, seq, name, grade, 
                    power, shield, critical, race, isCritical, 
                    isDraw, isHeal, isFront, isStand, isSentinel, 
                    triggerPower, isBoost, isIntercept, isTwinDrive,
                    isTripleDrive, forceGift,accelGift,protectGift,
                    imgUrl,cardFlavor,cardEffect, rarity);

                const preparedObject = this.prepareObject(obj, upCard);
                if(preparedObject.error != null){
                    return reject(preparedObject.error)
                }

                obj = preparedObject.result;

                const clanDao = new ClanDAO(this._db);
                const collecitonDao = new CollectionDAO(this._db);
                collecitonDao.checkCollection(obj.collectionId).then((collectionOk) => {
                    if(collectionOk){
                        clanDao.checkClan(obj.clanId).then((clanOk) => {
                            if(clanOk){
                                const stmt = this._db.prepare(this.UPDATE_CARD);
                                stmt.run([obj.clanId, obj.collectionId, obj.seq, obj.name, obj.grade, 
                                    obj.power, obj.shield, obj.critical, obj.race, obj.isCritical, 
                                    obj.isDraw, obj.isHeal, obj.isFront, obj.isStand, obj.isSentinel, 
                                    obj.triggerPower, obj.isBoost, obj.isIntercept, obj.isTwinDrive,
                                    obj.isTripleDrive, obj.forceGift, obj.accelGift, obj.protectGift,
                                    obj.imgUrl, obj.cardFlavor, obj.cardEffect, obj.rarity, id], (err) =>{
                                    if(err){
                                        
                                        console.log("Error ao atualizar carta: \n"+err.message);
                                        return reject(err.message);
                                    }
                                    return resolve(stmt.changes);
                                })
                            } else {
                                console.log("Error ao atualizar carta: Clã não existe");
                                return reject("Clã não encontrado");
                            }
                        })
                    } else {
                        console.log("Error ao atualizar carta: Coleção não existe");
                        return reject("Coleção não encontrada");
                    }
                })
                
            }).catch(err => {
                return reject(err);
            })
        });

    }

    prepareObject(objReference, newObject){
        const fields = ['clanId', 'collectionId', 'seq', 'name', 'grade', 'race', 'imgUrl', 
        'cardFlavor', 'power', 'shield', 'critical', 'isCritical', 'isHeal', 'isDraw', 'isFront', 
        'isStand','isSentinel', 'triggerPower', 'isBoost', 'isIntercept', 'isTwinDrive', 'isTripleDrive', 
        'forceGift', 'accelGift', 'protectGift', 'cardEffect', 'rarity'];

        fields.forEach(field => {
            objReference[field] = this.getObjNewValue(objReference, newObject, field);
        });

        const reject = (msg) => {
            return {error: msg, result: null};
        }

        if(objReference.clanId == undefined){
            return reject('clanId é um item obrigatorio');
        }
        if(objReference.collectionId == undefined){
            return reject('collectionId é um item obrigatorio');
        }
        if(objReference.seq == undefined){
            return reject('seq é um item obrigatorio');
        }
        if(objReference.name == undefined){
            return reject('name é um item obrigatorio');
        }
        if(objReference.grade == undefined){
            return reject('grade é um item obrigatorio');
        }
        if(objReference.race == undefined){
            return reject('race é um item obrigatorio');
        }
        if(objReference.imgUrl == undefined){
            return reject('imgUrl é um item obrigatorio');
        }
        if(objReference.cardFlavor == undefined){
            return reject('cardFlavor é um item obrigatorio');
        }


        return {error: null, result: objReference};
        
    }


    getObjNewValue(reference, newObj, field){
        const obj = (newObj[field] == undefined ? reference[field] : newObj[field]);
        //console.log("Set value on "+field+": "+obj);
        return obj ? obj.trim() : undefined;
    }
}

module.exports = CardsDAO;