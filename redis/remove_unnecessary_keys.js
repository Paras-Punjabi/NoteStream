import { config } from 'dotenv'
config()

import db from '../models/db.js'
import {notebooks} from '../models/schema.js'
import {eq,sql,inArray} from 'drizzle-orm'

const TIME_PERIOD = process.env.TIME_PERIOD

export async function get_keys(){
    let data = await db.execute(sql`SELECT notebook_id from notebooks where extract(epoch from AGE(NOW()::timestamp,last_update)) >= ${TIME_PERIOD}`)
    return data.rows
}

export async function delete_keys() {
    let keys = (await get_keys()).map((item)=>item.notebook_id)
    await db.delete(notebooks).where(inArray(notebooks.notebook_id,keys));
    console.log(keys)
}

(async ()=>{
    await delete_keys();
})()