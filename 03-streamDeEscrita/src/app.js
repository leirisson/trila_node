// Stream -> 

// import {Writable}

import { Readable, Writable, Transform } from "node:stream";


// stream de leitura
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

// stream transform 
class TansformValor extends Transform {
  /**
   * responsavel por (transformar) os dados antes que eles passem para a stream de escrita
   */
  _transform(chunck, encoding, callback){
    const transformed = Number(chunck.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

// stream de escrita
/**
 * 
 */
class MultiplyByTenStream extends Writable {
  /**
   * o metodo _write recebe obrigatoriamente 3 parametros
   * 1 - chunck => o pedaço que leu da stream de leitura (tudo que é enviado pela stram de escrita é um chunck)
   * 2 - encoding => como essa informação esta codificada
   * 3 - callback => é uma função que a stream de escrita precisa chamar quando ela terminar as suas tarefas
   * DENTRO DE UMA STREAM DE ESCRITA ELA NÃO RETORNA NADA ELA APENAS PROCESSA OS DADOS 
   * 
   * _write(chunck, encoding, callback){
   * }
   */

  _write(chunck, encoding, callback){
    console.log(Number(chunck.toString()) * 10)
    callback()
  }
}

new OneToHundredStream() // stream de leitura 
.pipe(new TansformValor()) // stream de transformação dos dados 
.pipe(new MultiplyByTenStream()) //  stream de escrita