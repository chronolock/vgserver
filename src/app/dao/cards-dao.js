const ClanDAO = require('./clan-dao');
const CollectionDAO = require('./collection-dao');

class CardsDAO{

    constructor(db){
        this._db = db;
        this.LIST_ALL = 'SELECT * FROM cards';
        this.ADD_CARD = `INSERT INTO cards(
            clanId, collectionId, seq, name, grade, 
            power, shield, critical, race, isCritical, 
            isDraw, isHeal, isFront, isStand, isSentinel, 
            triggerPower, isBoost, isIntercept, isTwinDrive,
            isTripleDrive, forceGift,accelGift,protectGift,
            imgUrl,cardFlavor,cardEffect, rarity) 
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    }

    list(){
        return new Promise((resolve, reject) => {
            this._db.all(this.LIST_ALL, (err, result) => {
                if(err) return reject(err.message);
                return resolve(result);
            });
        })
    }

    add({clanId, collectionId, seq, name, grade, 
        power, shield, critical, race, isCritical, 
        isDraw, isHeal, isFront, isStand, isSentinel, 
        triggerPower, isBoost, isIntercept, isTwinDrive,
        isTripleDrive, forceGift,accelGift,protectGift,
        imgUrl,cardFlavor,cardEffect, rarity}){


        cardFlavor = cardFlavor.trim();
        cardEffect = cardEffect.trim();
        imgUrl = imgUrl.trim();


        return new Promise((resolve, reject) => {
            if(clanId == undefined){
                return reject('clanId é um item obrigatorio');
            }
            if(collectionId == undefined){
                return reject('collectionId é um item obrigatorio');
            }
            if(seq == undefined){
                return reject('seq é um item obrigatorio');
            }
            if(name == undefined){
                return reject('name é um item obrigatorio');
            } else {
                name = name.trim();
            }
            if(grade == undefined){
                return reject('grade é um item obrigatorio');
            }
            if(power == undefined){
                power = 0;
            }
            if(shield == undefined){
                shield = 0;
            }
            if(critical == undefined){
                critical = 0;
            }
            if(race == undefined){
                return reject('race é um item obrigatorio');
            }
            if(isCritical == undefined){
                isCritical = 0;
            }
            if(isHeal == undefined){
                isHeal = 0;
            }
            if(isDraw == undefined){
                isDraw = 0;
            }
            if(isFront == undefined){
                isFront = 0;
            }
            if(isStand == undefined){
                isStand = 0;
            }
            if(isSentinel == undefined){
                isSentinel = false;
            }
            if(triggerPower == undefined){
                triggerPower = 0;
            }
            if(isBoost == undefined){
                isSentinel = false;
            }
            if(isIntercept == undefined){
                isIntercept = false;
            }
            if(isTripleDrive == undefined){
                isTwinDrive = false;
            }
            if(isTripleDrive == undefined){
                isTripleDrive = false;
            }
            if(forceGift == undefined){
                forceGift = false;
            }
            if(accelGift == undefined){
                accelGift = false;
            }
            if(protectGift == undefined){
                protectGift = false;
            }
            if(imgUrl == undefined){
                return reject('imgUrl é um item obrigatorio');
            } else {
                imgUrl = imgUrl.trim();
            }
            if(cardFlavor == undefined){
                return reject('cardFlavor é um item obrigatorio');
            } else {
                cardFlavor = cardFlavor.trim();
            }
            if(cardEffect == undefined){
                cardEffect = '';
            } else {
                cardEffect = cardEffect.trim();
            }

            const clanDao = new ClanDAO(this._db);
            const collecitonDao = new CollectionDAO(this._db);
            collecitonDao.checkCollection(collectionId).then((collectionOk) => {
                if(collectionOk){
                    clanDao.checkClan(clanId).then((clanOk) => {
                        if(clanOk){
                            const stmt = this._db.prepare(this.ADD_CARD);
                            stmt.run([clanId, collectionId, seq, name, grade, 
                                power, shield, critical, race, isCritical, 
                                isDraw, isHeal, isFront, isStand, isSentinel, 
                                triggerPower, isBoost, isIntercept, isTwinDrive,
                                isTripleDrive, forceGift,accelGift,protectGift,
                                imgUrl,cardFlavor,cardEffect, rarity], (err) =>{
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

    }
}

module.exports = CardsDAO;