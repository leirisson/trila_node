// Stream -> 

// import {Writable}

import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1

  _read(){
    const i = this.index++
    setTimeout(() => {
      if(i > 100){
        this.push(null)
      } else {
        this.push(Buffer.from(String(i)))
      }
    }, 1000)
  }

}


new OneToHundredStream().pipe(process.stdout)