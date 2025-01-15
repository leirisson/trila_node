// Stream -> 

// stdin = strem de entrada 
// stdout = stream de saida
// usando o pipe para ler os dados aos poucos
// process.stdin.pipe(process.stdout)


import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {

  index = 1
  // criando uma stream de leitura do zera
  // pode ser interpretado como ler dado do front-end 
  // metodo obrigatorio 

  _read() {
    const i = this.index++
    
      setTimeout(() => {
        if (i > 100) {
          this.push(null)
        } else {
          this.push(Buffer.from(String(i)))
        }
      }, 1000)
  }
}

new OneToHundredStream()
.pipe(process.stdout)
