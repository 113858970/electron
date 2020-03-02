const { app} = require('electron')
const Store = require('electron-store')
const uuidv4 = require('uuid/v4') //生成独一无二的uid
const path = require('path')

console.log(app.getPath('userData')) //查看electron-store存储的文件路径

class DataStore extends Store {
  constructor(settings){
    super(settings)
    this.tracks = this.get('tracks') || []
  }
  saveTracks(){
    this.set('tracks', this.tracks)
    return this
  }
  getTracks(){
    return this.get('tracks') || []
  }
  addTracks(tracks) {
    const tracksWithProps = tracks.map(track => {
      return {
        id: uuidv4(),
        path: track,
        fileName: path.basename(track)
      }
    }).filter(track => {
      const currentTracksPath = this.getTracks().map(track => track.path)
      return currentTracksPath.indexOf(track.path) < 0
    })
    this.tracks = [ ...this.tracks, ...tracksWithProps ]
    return this.saveTracks()
  }
  deleteTrack(deletedId) {
    this.tracks = this.tracks.filter(item => item.id !== deletedId)
    return this.saveTracks()
  }
}

module.exports = DataStore
