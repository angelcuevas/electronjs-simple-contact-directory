const dbmgr = require("./dbmgr")
const getDbConnection = dbmgr.getDbConnection


const  getNames = (dbPath)=>{
    const db = getDbConnection(dbPath);
    if(!db){
        return new Promise(resolve=>resolve([{name:dbPath}]))
    }
    return new Promise((resolve, reject)=>{
        db.all("SELECT * FROM test", [], (err, rows) => {
            let arr = [{name:dbPath}]
            if (err) {
                reject([])
            }
            if(rows){
                arr = [...arr,...rows]
            }
            resolve(arr)
          });
    })

}

module.exports = {
    getNames
}


