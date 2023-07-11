
import { MongoClient } from 'mongodb';
const uri = "mongodb+srv://prakashthakuri2000:nDZtbNVcq1z8ItfX@cluster0.fdwj189.mongodb.net/?retryWrites=true&w=majority"
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
let dbClient;

export async function connectToDatabase() {
  try {
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
}
