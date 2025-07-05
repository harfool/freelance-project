import app from './app.js'
import dotenv from 'dotenv'
import connectDB from './db/dbConnect.js'
dotenv.config({
    path: './.env'
})
const Port = process.env.PORT ||8000
connectDB()
.then(()=>{

    app.listen(Port, () => {
        console.log(`server running on ${Port}`)
    })
})
.catch((error)=>{
console.error("Mongo connection Error :" , error)
process.exit(1)
})

