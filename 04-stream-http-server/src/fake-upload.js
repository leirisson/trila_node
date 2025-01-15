import { Readable } from 'node:stream'

class OnToHundredStream extends Readable {
  index = 1;

  _read(){
    const i = this.index++

    setTimeout(()=>{
      if(i > 100){
        this.push(null)
      } else {
        this.push(Buffer.from(String(i)))
      }
    }, 1000)
  }
}

try {
  fetch('http://localhost:3333/', {
    method: 'POST',
    duplex: "half",
    body:  new OnToHundredStream(),
  })
} catch (error) {
  new Error.message("ERRO NA REQUISIÇÃO: " + error)
}