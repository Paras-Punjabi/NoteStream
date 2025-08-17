import { config } from 'dotenv'
config()

import {Server as SocketServer} from 'socket.io'
import express from 'express'
import {createServer} from 'http'
import cors from 'cors'
import apiRouter from './routes/api.route.js'
import notebookRouter from './routes/notebook.route.js'
import { new_user, notebook_update, close_user } from './sockets/socket.js'

const app = express()
const server = createServer(app)
const io = new SocketServer(server)
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.set("view engine","ejs")

io.on("connection",(socket)=>{
    socket.on("user:new",async (data)=>await new_user(socket,data));
    socket.on("user:close",async(data)=>await close_user(socket,data));
    socket.on("notebook:update",async(data)=>await notebook_update(socket,data));
})

app.use("/api",apiRouter)
app.use("/notebook",notebookRouter)

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/health",(req,res)=>{
    res.status(200).json({success:true,message:"Health is Good"})
})

server.listen(PORT,()=>{
    console.log(`App Server and Socket Server Started on ${PORT}`)
})

