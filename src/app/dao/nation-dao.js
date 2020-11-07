class NationDAO{

    constructor(db){
        this._db = db;
        this.LIST_ALL = 'SELECT * FROM Nation';
    }

    list(){
        return new Promise((resolve, reject) => {
            this._db.all(this.LIST_ALL, (err, result) => {
                if(err) return reject(err.message);
                return resolve(result);
            });
        })
    }

}

module.exports = NationDAO;