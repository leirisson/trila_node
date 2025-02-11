import { app } from "./app";


app.listen({
    host: '0.0.0.0',
    port:3334
})
.then(()=>{
  
    console.log("Server runing")
    console.log("✔✨🔥 http://localhost:3334/")
})