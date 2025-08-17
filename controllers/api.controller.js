import {notebooks} from '../models/schema.js'
import db,{DatabaseError} from '../models/db.js'
import {eq} from 'drizzle-orm'

export async function createNotebook(req,res){
    try{
        const row = await db.insert(notebooks).values({content:""}).returning()
        res.status(200).json({success:true,message:"notebook created",data:row[0].notebook_id})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,message:err})
    }
}

export async function getNotebook(req,res){
    try{
        const {notebook_id} = req.body
        const data = await db.select().from(notebooks).where(eq(notebooks.notebook_id,notebook_id))
        if(data.length != 1){
            throw new DatabaseError("Notebook does not exists",404)
        }
        res.json({status:true,data:data[0]})
    }
    catch(err){
        if(err instanceof DatabaseError){
            res.status(err.status_code).json({success:false,message:err.message})
        }
        res.status(500).json({success:false,message:err})
    }
}

export async function updateNotebook(req,res){
    try{
        const {notebook_id,content} = req.body
        await db.transaction(async(tx)=>{
            await db.update(notebooks).set({content}).where(eq(notebooks.notebook_id,notebook_id));
        })
        res.json({status:true,message:"Notebook updated"})
    }
    catch(err){
        if(err instanceof DatabaseError){
            res.status(err.status_code).json({success:false,message:err.message})
        }
        res.status(500).json({success:false,message:err})
    }
}

