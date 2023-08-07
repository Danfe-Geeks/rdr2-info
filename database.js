
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
 
const uri = process.env.DATABASE_CONNECTION || 'mongodb+srv://rdr2:DYZFyLYWrIuyGRU0@cluster0.fdwj189.mongodb.net/'
let dbClient;

export async function connectToDatabase() {
  try {
    console.log(uri, "Mongo DB URL")
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
    dbClient = client.db('rdr2');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

export function getDBClient() {
  return dbClient;
};