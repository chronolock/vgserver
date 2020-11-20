class ClanDAO{

    constructor(db){
        this._db = db;
        this.LIST_ALL = 'SELECT * FROM Clan';
        this.ADD_CLAN = 'INSERT INTO clan(name, nation, gift) VALUES(?, ?, ?);';
        this.CHECK_CLAN = 'SELECT COUNT(*) as c FROM clan WHERE id = ?';;
    }

    list(){
        return new Promise((resolve, reject) => {
            this._db.all(this.LIST_ALL, (err, result) => {
                if(err) return reject(err.message);
                return resolve(result);
            });
        })
    }

    add({name, nationId, gift}){
        return new Promise((resolve, reject) => {
            const stmt = this._db.prepare(this.ADD_CLAN);
            stmt.run([name, nationId, gift], (err) =>{
                if(err){
                    console.log("Error ao inserir clã: \n"+err.message);
                    return reject(err.message);
                }
                return resolve(stmt.lastID);
            })
        });
    }

    update({id, name, nationId, gift}){

    }

    checkClan(id){
        return new Promise((resolve, reject) => {
            this._db.all(this.CHECK_CLAN, [id], (err, result) => {
                if(err) return reject(err.message);
                return resolve(result[0].c == '1');
            });
        })
    }
}

module.exports = ClanDAO;