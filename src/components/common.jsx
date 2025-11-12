'use strict'
/* global Global */
const reSmile = /:\w+:/gi

class Message {
  constructor (message) {
    this.images = message.images
    this.message = message
  }

  addSmileG (smileId, smileName, smiles) {
    return smiles.some((smile) => {
      if (smile.name === smileName) {
        this.images[smileId] = smile.animated ? smile.img_gif : smile.img_big
        return true
      }
      return false
    })
  }

  prepareG () {
    const m = this.message.text.match(reSmile)
    if (m) {
      m.forEach((smileId) => {
        const smileName = smileId.slice(1, -1)
        const isFound = this.addSmileG(smileId, smileName, Global.Smiles)
        if (!isFound) {
          this.message.premiums.forEach((id) => {
            if (id in Global.Channel_Smiles) {
              this.addSmileG(smileId, smileName, Global.Channel_Smiles[id])
            }
          })
        }
      })
    }
  }

  replace () {
    if (this.message.id === 'g') {
      this.prepareG()
    }
  }
}

export { Message }
