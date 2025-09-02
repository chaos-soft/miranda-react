'use strict'
/* global Global */

const reSmile = /:\w+:/gi

class Message {
  constructor (message) {
    this.message = message
    this.replacements = 'replacements' in message ? message.replacements : []
  }

  addReplacement (replacement, smileName, smiles) {
    return smiles.some((smile) => {
      if (smile.name === smileName) {
        this.replacements.push([
          replacement,
          smile.animated ? smile.img_gif : smile.img_big
        ])
        return true
      }
      return false
    })
  }

  prepareG () {
    const m = this.message.text.match(reSmile)
    if (m) {
      m.forEach((replacement) => {
        const smileName = replacement.slice(1, -1)
        const isFound = this.addReplacement(replacement, smileName, Global.Smiles)
        if (!isFound) {
          this.message.premiums.forEach((id) => {
            if (id in Global.Channel_Smiles) {
              this.addReplacement(replacement, smileName, Global.Channel_Smiles[id])
            }
          })
        }
      })
    }
  }

  prepareT () {
    for (const r of this.replacements) {
      if (r.length === 2) {
        r[1] = `https://static-cdn.jtvnw.net/emoticons/v1/${r[1]}/1.0`
      }
    }
  }

  replace_ () {
    let img
    let search
    this.replacements.forEach((replacement) => {
      if (replacement.length === 2) {
        img = `<img src="${replacement[1]}">`
        search = new RegExp(replacement[0], 'gi')
      } else {
        img = `<img src="${replacement}">`
        search = replacement
      }
      this.message.text = this.message.text.replace(search, img)
    })
  }

  replace () {
    if (this.message.id === 'g') {
      this.prepareG()
    } else if (this.message.id === 't') {
      this.prepareT()
    }
    this.replace_()
  }
}

export { Message }
