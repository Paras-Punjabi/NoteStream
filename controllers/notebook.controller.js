import db from '../models/db.js'
import {notebooks} from '../models/schema.js'
import {eq} from 'drizzle-orm'
import redis from '../redis/redis.js'

export async function renderNotebook(req,res){
    const notebook_id = req.params.id
    let id,content;
    let exists = await redis.exists(notebook_id) 
    if(exists){
        id = notebook_id
        content = await redis.get(notebook_id);
    }   
    else{
        const data = await db.select().from(notebooks).where(eq(notebooks.notebook_id,notebook_id))
        if(data.length != 1){
            return res.status(404).json({message:`NOTEBOOK with ID ${notebook_id} NOT FOUND`});
        }
        id = data[0].notebook_id
        content = data[0].content
        await redis.setex(id,200,content);
    }
    res.render("notebook",{id,content})
}