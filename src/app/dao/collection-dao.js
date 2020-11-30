const Collection = require("../model/Collection");

class CollectionDAO{

    constructor(db){
        this._db = db;
        this.LIST_ALL = 'SELECT * FROM collection';
        this.ADD_COLLECTION = 'INSERT INTO collection(name, cod, era) VALUES(?, ?, ?);';
        this.UPDATE_COLLECTION = 'UPDATE collection SET name = ?, cod = ?, era = ? WHERE id = ?;';
        this.DELETE_COLLECTION = 'DELETE FROM collection WHERE id = ?;';
        this.CHECK_COLLECTION = 'SELECT COUNT(*) as c FROM collection WHERE id = ?';
        this.GET_BY_ID = `SELECT * FROM collection WHERE id = ?`
    }

    list(){
        return new Promise((resolve, reject) => {
            this._db.all(this.LIST_ALL, (err, result) => {
                if(err) return reject(err.message);
                return resolve(result);
            });
        })
    }

    add({name, cod, era}){
        name = name.trim();
        cod = cod.trim();
        if(era == undefined){
            era = 'V';
        }
        return new Promise((resolve, reject) => {
            const stmt = this._db.prepare(this.ADD_COLLECTION);
            stmt.run([name, cod, era], (err) =>{
                if(err){
                    console.log("Error ao inserir coleção: \n"+err.message);
                    return reject(err.message);
                }
                return resolve(stmt.lastID);
            })
        });
    }

    update({id, name, cod, era}){
        return new Promise((resolve, reject) => {
            const stmt = this._db.prepare(this.UPDATE_COLLECTION);
            stmt.run([name, cod, era, id], (err) =>{
                if(err){
                    console.log("Error ao atualizar coleção: \n"+err.message);
                    return reject(err.message);
                }
                return resolve(stmt.changes);
            })
        });
    }

    delete(id){
        return new Promise((resolve, reject) => {
            const stmt = this._db.prepare(this.DELETE_COLLECTION);
            stmt.run(id, (err) =>{
                if(err){
                    console.log("Error ao apagar coleção: \n"+err.message);
                    return reject(err.message);
                }
                return resolve(stmt.changes);
            })
        });
    }

    checkCollection(id){
        return new Promise((resolve, reject) => {
            this._db.all(this.CHECK_COLLECTION, [id], (err, result) => {
                if(err) return reject(err.message);
                return resolve(result[0].c == '1');
            });
        })
    }

    getById(id){
        return new Promise((resolve, reject) => {
            this._db.all(this.GET_BY_ID, [id], (err, result) => {
                if(err) return reject(err.message);
                const res = new Collection(result[0].id, result[0].name, result[0].cod, result[0].era);
                return resolve(res);
            });
        })
    }
}

module.exports = CollectionDAO;