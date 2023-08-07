
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
// const uri = "mongodb+srv://cluster0.fdwj189.mongodb.net/?authMechanism=MONGODB-X509&authSource=%24external&tls=true&tlsCertificateKeyFile=%2FUsers%2Fprakashthakuri%2FDownloads%2FX509-cert-5765427148407296337.pem"
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
 
// const uri = process.env.DATABASE_CONNECTION
const uri = 'mongodb+srv://rdr2:DYZFyLYWrIuyGRU0@cluster0.fdwj189.mongodb.net/'
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