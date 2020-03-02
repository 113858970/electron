const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded',() => {
  ipcRenderer.send('message','this is message content')
  ipcRenderer.on('reply',(event, arg) => {
    document.getElementById('message').innerHTML = arg
  })
})
