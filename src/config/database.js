const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('Data.db');

const USUARIO_SCHEMA = `
    CREATE TABLE IF NOT EXISTS user(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nickname VARCHAR(40) NOT NULL,
        friend_code VARCHAR(12) NOT NULL,
        email VARCHAR(255) NOT NULL
    )
`;

const NATION_SCHEMA = `
    CREATE TABLE IF NOT EXISTS nation(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) NOT NULL
    )
`;

const CLAN_SCHEMA = `
    CREATE TABLE IF NOT EXISTS clan(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) NOT NULL,
        nation INTEGER NOT NULL
    )
`;

const COLLECTION_SCHEMA = `
        CREATE TABLE IF NOT EXISTS collection(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(100) NOT NULL,
            cod VARCHAR(10) NOT NULL,
            era VARCHAR(1) NOT NULL DEFAULT 'V'
        )
`;

const CARDS_SCHEMA = `
        CREATE TABLE IF NOT EXISTS cards(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            clanId INTEGER NOT NULL,
            collectionId INTEGER NOT NULL,
            seq INTEGER NOT NULL,
            name VARCHAR(150) NOT NULL,
            grade INTEGER NOT NULL,
            power INTEGER,
            shield INTEGER,
            critical INTEGER,
            race VARCHAR(100),
            isCritical TINYINT,
            isDraw TINYINT,
            isHeal TINYINT,
            isFront TINYINT,
            isStand TINYINT,
            isSentinel TINYINT,
            triggerPower INTEGER,
            isBoost TINYINT,
            isIntercept TINYINT,
            isTwinDrive TINYINT,
            isTripleDrive TINYINT,
            forceGift TINYINT,
            accelGift TINYINT,
            protectGift TINYINT,
            imgUrl VARCHAR(255),
            cardFlavor VARCHAR(255),
            cardEffect TEXT,
            rarity VARCHAR(10)
        )
`;

const NATIONS = ['Star Gate', 'Magallanica', 'United Sanctuary', 'Dark Zone', 'Zoo', 'Dragon Empire', '-'];
const CLANS = [
    ['Dimension Police', 'Link Joker', 'Nova Grappler'],
    ['Granblue', 'Aqua Force', 'Bermuda Triangle'],
    ['Oracle Think Tank', 'Royal Paladin', 'Shadow Paladin', 'Gold Paladin', 'Genesis', 'Angel Feather'],
    ['Gear Chronicle', 'Pale Moon', 'Spike Brothers', 'Dark Irregulars'],
    ['Great Nature', 'Megacolony', 'Neo Nectar'],
    ['Narukami', 'Kagero', 'Murakumo', 'Tachikaze', 'Nubatama'],
    ['Cray Elemental', '-']
]

const NATION_INSERT = `INSERT INTO nation(name) SELECT ? WHERE NOT EXISTS (SELECT * FROM nation WHERE name = ?);`;

const CLAN_INSERT = `INSERT INTO clan(name, nation) SELECT ?, ? WHERE NOT EXISTS (SELECT * FROM clan WHERE name = ?);`;

const GET_NATION_ID = `SELECT id FROM nation WHERE name = ?`;

const CHECK_NATION_DATA = `SELECT * FROM nation`;

const CHECK_CLAN_DATA = `SELECT * FROM clan ORDER BY nation ASC`;

db.serialize(() => {
    db.run(USUARIO_SCHEMA);
    db.run(NATION_SCHEMA);
    db.run(CLAN_SCHEMA);
    db.run(COLLECTION_SCHEMA);
    db.run(CARDS_SCHEMA);

    for(let i = 0; i < NATIONS.length; i++){
        const currentNation = NATIONS[i];
        db.run(NATION_INSERT, [currentNation, currentNation]);
        db.all(GET_NATION_ID, [currentNation], (err, row) => {
            if(row.length == 1){
                for(let j = 0; j < CLANS[i].length; j++){
                    const currentClan = CLANS[i][j];
                    //console.log("Insert: "+currentClan);
                    db.run(CLAN_INSERT, [currentClan, row[0].id, currentClan])
                }
            } else {
                throw new Error("Não achei uma nação ou ela esta duplicada no banco " + row.length);
            }
        })
    }
    /*db.each(CHECK_NATION_DATA, (err, row) =>{
        console.log(row);
    });

    db.each(CHECK_CLAN_DATA, (err, row) =>{
        console.log(row);
    });*/
    console.log('Run init DB');
});


module.exports = db;