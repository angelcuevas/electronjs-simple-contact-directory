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


const getPeople = (dbPath, text)=>{
    const db = getDbConnection(dbPath);
    if(!db){
        return new Promise(resolve=>resolve([{name:dbPath}]))
    }
    return new Promise((resolve, reject)=>{
        let query = "SELECT * FROM people ";

        if(text){
            query += ` WHERE phone LIKE "%${text}%" OR name LIKE "%${text}%" `
        }
        db.all(query, [], (err, rows) => {

            if (err) {
                reject([])
            }

            resolve(rows)
          });
    })

}

const savePerson = (dbPath, personData)=>{
    const db = getDbConnection(dbPath);

    return new Promise((resolve, reject)=>{
        let query = `INSERT INTO people (name, phone, address) values("${personData.name}","${personData.phone}","${personData.address}")`;

        db.run(query, [], (err, rows) => {

            if (err) {
                reject([])
            }

            resolve(rows)
          });
    })
}


const editPerson = (dbPath, personData)=>{
    const db = getDbConnection(dbPath);

    return new Promise((resolve, reject)=>{
        let query = `UPDATE people SET name="${personData.name}", phone="${personData.phone}", address="${personData.address}" WHERE id = ${personData.id}`;

        db.run(query, [], (err) => {
            console.log(err)
            if (err) {
                reject([])
            }

            resolve(true)
          });
    })
}

const deletePerson = (dbPath, personId)=>{
    const db = getDbConnection(dbPath);

    return new Promise((resolve, reject)=>{
        let query = `DELETE FROM people  WHERE id = ${personId}`;

        db.run(query, [], (err) => {
            
            if (err) {
                reject([])
            }

            db.run(`DELETE FROM subsidies  WHERE people_id = ${personId}`, [], (err) => {
            
                if (err) {
                    reject([])
                }
                resolve(true)
              });

            
          });
    })
}


const getAids = (dbPath, personId, text)=>{
    const db = getDbConnection(dbPath);
    if(!db){
        return new Promise(resolve=>resolve([{name:dbPath}]))
    }
    return new Promise((resolve, reject)=>{
        let query = `SELECT * FROM subsidies WHERE people_id=${personId}`;

        if(text){
            query += ` AND (description LIKE "%${text}%" OR comment LIKE "%${text}%") `
        }
        db.all(query, [], (err, rows) => {

            if (err) {
                reject([])
            }

            resolve(rows)
          });
    })

}

const saveAid = (dbPath, personId, aidData)=>{
    const db = getDbConnection(dbPath); 
    const date = new Date();
    return new Promise((resolve, reject)=>{
        let query = `INSERT INTO subsidies (people_id, description, date, comment ) values("${personId}","${aidData.description}","${date.toString()}","${aidData.comment}")`;

        db.run(query, [], (err, rows) => {

            if (err) {
                reject([])
            }

            resolve(rows)
          });
    })
}

module.exports = {
    getNames,
    getPeople,
    savePerson,
    editPerson,
    deletePerson,
    getAids,
    saveAid
}


