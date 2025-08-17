import { config } from 'dotenv'
config()

import {Redis} from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

redis.on("ready",()=>{
    console.log("Redis connected")
})

export default redis