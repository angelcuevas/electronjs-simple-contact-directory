const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const isDev= require('electron-is-dev')
const test = require("../database/models/test")

const dbPath = isDev ? path.join(app.getAppPath(),'extraResources' ,"test.db") : path.join(app.getAppPath(),'..','..','resources','extraResources', "test.db") 

function createWindow () {
  const win = new BrowserWindow({
    webPreferences: {
        sandbox: false,
        contextIsolation:true,
        preload: path.join(__dirname, 'preload.js')
    }
  })
  win.maximize();
  win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname,'../build/index.html')}`)  
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})


ipcMain.handle('get/names',async (event, args)=>{
  return test.getNames(dbPath);
})

ipcMain.handle('get/people',async (event, args)=>{
  return test.getPeople(dbPath,args);
})

ipcMain.handle('person/save',async (event, args)=>{
  return test.savePerson(dbPath,args);
})

ipcMain.handle('person/edit',async (event, args)=>{
  return test.editPerson(dbPath,args);
})

ipcMain.handle('person/delete',async (event, args)=>{
  return test.deletePerson(dbPath,args);
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})