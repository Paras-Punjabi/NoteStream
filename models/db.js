import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from 'dotenv';

config()

const db = drizzle(process.env.DATABASE_URL)

export class DatabaseError extends Error{
    constructor(message,status_code){
        super()
        this.message = message
        this.status_code = status_code
    }
}

export default db