'use strict'
/* global Global */
const reSmile = /:\w+:/gi

class Message {
  constructor (message) {
    this.images = 'images' in message ? message.images : {}
    this.message = message
  }

  addImageG (id, smileName, smiles) {
    return smiles.some((smile) => {
      if (smile.name === smileName) {
        this.images[id] = smile.animated ? smile.img_gif : smile.img_big
        return true
      }
      return false
    })
  }

  prepareG () {
    const m = this.message.text.match(reSmile)
    if (m) {
      m.forEach((id) => {
        const smileName = id.slice(1, -1)
        const isFound = this.addImageG(id, smileName, Global.Smiles)
        if (!isFound) {
          this.message.premiums.forEach((id) => {
            if (id in Global.Channel_Smiles) {
              this.addImageG(id, smileName, Global.Channel_Smiles[id])
            }
          })
        }
      })
    }
  }

  replace_ () {
    for (const k in this.images) {
      this.message.text = this.message.text.replaceAll(k, `<img src="${this.images[k]}">`)
    }
  }

  replace () {
    const html = document.createTextNode(this.message.text)
    this.message.text = html.textContent
    if (this.message.id === 'g') {
      this.prepareG()
    }
    this.replace_()
  }
}

export { Message }
