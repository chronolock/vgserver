class Cards{

    constructor(id, clanId, collectionId, seq, name, grade, 
        power, shield, critical, race, isCritical, 
        isDraw, isHeal, isFront, isStand, isSentinel, 
        triggerPower, isBoost, isIntercept, isTwinDrive,
        isTripleDrive, forceGift,accelGift,protectGift,
        imgUrl,cardFlavor,cardEffect, rarity){
        
        if(arguments.length == 0){
            this._id = undefined;
            this._clanId = undefined;
            this._collectionId = undefined;
            this._seq = undefined;
            this._name = undefined;
            this._grade = undefined;
            this._power = 0;
            this._shield = 0;
            this._critical = 1;
            this._race = undefined;
            this._isCritical = 0;
            this._isDraw = 0;
            this._isHeal = 0;
            this._isFront = 0;
            this._isStand = 0;
            this._isSentinel = 0;
            this._triggerPower = 0;
            this._isBoost = 0;
            this._isIntercept = 0;
            this._isTwinDrive = 0;
            this._isTripleDrive = 0;
            this._forceGift = 0;
            this._accelGift = 0;
            this._protectGift = 0;
            this._imgUrl = undefined;
            this._cardFlavor = undefined;
            this._cardEffect = '';
            this._rarity = 'C';
        } else {
            this._id = id;
            this._clanId = clanId;
            this._collectionId = collectionId;
            this._seq = seq;
            this._name = name;
            this._grade = grade;
            this._power = power;
            this._shield = shield;
            this._critical = critical;
            this._race = race;
            this._isCritical = isCritical;
            this._isDraw = isDraw;
            this._isHeal = isHeal;
            this._isFront = isFront;
            this._isStand = isStand;
            this._isSentinel = isSentinel;
            this._triggerPower = triggerPower;
            this._isBoost = isBoost;
            this._isIntercept = isIntercept;
            this._isTwinDrive = isTwinDrive;
            this._isTripleDrive = isTripleDrive;
            this._forceGift = forceGift;
            this._accelGift = accelGift;
            this._protectGift = protectGift;
            this._imgUrl = imgUrl;
            this._cardFlavor = cardFlavor;
            this._cardEffect = cardEffect;
            this._rarity = rarity;
        }
    }

    get id(){
        return this._id;
    }

    set id(value){
        this._id = value;
    }

    get clanId(){
        return this._clanId;
    }

    set clanId(value){
        this._clanId = value;
    }

    get collectionId(){
        return this._collectionId;
    }

    set collectionId(value){
        this._collectionId = value;
    }

    get seq(){
        return this._seq;
    }

    set seq(value){
        this._seq = value;
    }

    get name(){
        return this._name;
    }

    set name(value){
        this._name = value;
    }

    get grade(){
        return this._grade;
    }

    set grade(value){
        this._grade = value;
    }

    get power(){
        return this._power;
    }

    set power(value){
        this._power = value;
    }

    get shield(){
        return this._shield;
    }

    set shield(value){
        this._shield = value;
    }

    get critical(){
        return this._critical;
    }

    set critical(value){
        this._critical = value;
    }

    get race(){
        return this._race;
    }

    set race(value){
        this._race = value;
    }

    get isCritical(){
        return this._isCritical;
    }

    set isCritical(value){
        this._isCritical = value;
    }

    get isDraw(){
        return this._isDraw;
    }

    set isDraw(value){
        this._isDraw = value;
    }

    get isHeal(){
        return this._isHeal;
    }

    set isHeal(value){
        this._isHeal = value;
    }

    get isFront(){
        return this._isFront;
    }

    set isFront(value){
        this._isFront = value;
    }

    get isStand(){
        return this._isStand;
    }

    set isStand(value){
        this._isStand = value;
    }

    get isSentinel(){
        return this._isSentinel;
    }

    set isSentinel(value){
        this._isSentinel = value;
    }

    get triggerPower(){
        return this._triggerPower;
    }

    set triggerPower(value){
        this._triggerPower = value;
    }

    get isBoost(){
        return this._isBoost;
    }

    set isBoost(value){
        this._isBoost = value;
    }

    get isIntercept(){
        return this._isIntercept;
    }

    set isIntercept(value){
        this._isIntercept = value;
    }

    get isTwinDrive(){
        return this._isTwinDrive;
    }

    set isTwinDrive(value){
        this._isTwinDrive = value;
    }

    get isTripleDrive(){
        return this._isTripleDrive;
    }

    set isTripleDrive(value){
        this._isTripleDrive = value;
    }

    get forceGift(){
        return this._forceGift;
    }

    set forceGift(value){
        this._forceGift = value;
    }

    get accelGift(){
        return this._accelGift;
    }

    set accelGift(value){
        this._accelGift = value;
    }

    get protectGift(){
        return this._protectGift;
    }

    set protectGift(value){
        this._protectGift = value;
    }

    get imgUrl(){
        return this._imgUrl;
    }

    set imgUrl(value){
        this._imgUrl = value;
    }

    get cardFlavor(){
        return this._cardFlavor;
    }

    set cardFlavor(value){
        this._cardFlavor = value;
    }

    get cardEffect(){
        return this._cardEffect;
    }

    set cardEffect(value){
        this._cardEffect = value;
    }

    get rarity(){
        return this._rarity;
    }

    set rarity(value){
        this._rarity = value;
    }

    toJson(){
        return `
        {
            "id": ${this.id},
            "clanId": ${this.clanId},
            "collectionId": ${this.collectionId},
            "seq": ${this.seq},
            "name": "${this.name}",
            "grade": ${this.grade},
            "power": ${this.power},
            "shield": ${this.shield},
            "critical": ${this.critical},
            "race": "${this.race}",
            "isCritical": ${this.isCritical},
            "isDraw": ${this.isDraw},
            "isHeal": ${this.isHeal},
            "isFront": ${this.isFront},
            "isStand": ${this.isStand},
            "isSentinel": ${this.isSentinel},
            "triggerPower": ${this.triggerPower},
            "isBoost": ${this.isBoost},
            "isIntercept": ${this.isIntercept},
            "isTwinDrive": ${this.isTwinDrive},
            "isTripleDrive": ${this.isTripleDrive},
            "forceGift": ${this.forceGift},
            "accelGift": ${this.accelGift},
            "protectGift": ${this.protectGift},
            "imgUrl": "${this.imgUrl}",
            "cardFlavor": "${this.cardFlavor}",
            "cardEffect": "${this.cardEffect.replace("\n", "<br>")}",
            "rarity": "${this.rarity}"
        }
        `;
    }
}

module.exports = Cards;