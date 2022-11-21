const sqlite3 = require('sqlite3')
const path = require('path')
const isDev= require('electron-is-dev')
const {app} = require('electron')

//const db= new sqlite3.Database('../../test.db')

//console.log("MIERDa",app.getAppPath());

//const dbPath = isDev ? path.join(app.getAppPath(), "test.db") : path.join(app.getAppPath(),'..','..','resources','app.asar.unpacked', "test.db") 

const getDbConnection = (dbPath)=>{
  return new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.log('Could not connect to database ' + dbPath, err)
    } else {
      console.log('Connected to database' + dbPath)
    }
  })
} 


exports.getDbConnection = getDbConnection; 