// fake upload arquivo

import { Readable } from 'node:stream'

class OnToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++
    setTimeout(() => {
      if (i > 10) {
        this.push(null)
      } else {
        this.push(Buffer.from(String(i)))
      }
    }, 1000)

  }
}

try {
fetch('http://localhost:3334/', {
  method: 'POST',
  duplex: 'half',
  body: new OnToHundredStream()
}).then(response => {
  return response
}).then(data => {
  return data
})
} catch(error){
  new Error.message("Erro => ", error)
}