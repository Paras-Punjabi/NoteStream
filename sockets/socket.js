import db from '../models/db.js'
import {notebooks} from '../models/schema.js'
import {eq} from 'drizzle-orm'
import redis from '../redis/redis.js'

export async function new_user(socket,data){
    console.log(`New User Joined with socket id ${socket.id} and notebook id ${data.notebook_id}`)
    socket.join(data.notebook_id);
}

export async function close_user(socket,data){
    console.log(`User Disconnected with socket id ${socket.id} and notebook id ${data.notebook_id}`)
    socket.leave(data.notebook_id);
}

export async function notebook_update(socket,data){
    let content = data.new_content
    let notebook_id = data.notebook_id
    await db.transaction(async(tx)=>{
        await db.update(notebooks).set({content}).where(eq(notebooks.notebook_id,notebook_id));
        await redis.setex(notebook_id,120,content);
    })
    socket.broadcast.to(notebook_id).emit("notebook:content",{content})
}