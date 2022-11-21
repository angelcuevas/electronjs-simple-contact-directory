const {contextBridge, ipcRenderer} = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
  })


  const API = {
    getNames: ()=>ipcRenderer.invoke('get/names'),
    getPeople: (text)=>ipcRenderer.invoke('get/people',text),
    savePerson: (personData)=>ipcRenderer.invoke('person/save',personData),
    editPerson: (personData)=>ipcRenderer.invoke('person/edit',personData),
    deletePerson: (personId)=>ipcRenderer.invoke('person/delete',personId),
    saveAid: (personId, aidData)=>ipcRenderer.invoke('aid/save',{personId,aidData}),
    getAids:(personId, text)=>ipcRenderer.invoke('get/aids',{personId,text}),
  }
 

  contextBridge.exposeInMainWorld('api', API);