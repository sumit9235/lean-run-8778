const express = require('express')
const connectionToDb = require('./connection')
const auth = require('./auth.miidleware')
const instRouter = require('./routes')
const cors = require("cors")
var cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use("/courses", instRouter)
// app.use(auth)

app.listen(8080,async ()=>{
    try {
        await connectionToDb
        console.log("connected to db") 
        console.log("listening on port 8080")
    } catch (error) {
        console.log(error)
    }
})