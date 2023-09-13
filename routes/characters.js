import express from 'express';
import { getDBClient } from '../database.js';
import { ROUTES } from '../constants/route.js';
const charactersRouter = express.Router();
// Middleware
charactersRouter.use((req, res, next) => {
  console.log('Working');
  next();
});

// Route to fetch data from MongoDB collection and display it in a new page

charactersRouter.get( '/', async (req, res) => {
  try {
    const dbClient = getDBClient()
    // const collection = dbClient.collection('characters'); 
    res.send(
      `It is working
      this is the 1 of the collection it has.${dbClient.listCollections()}
      If you do not see the collection name, your database is not connected.`

    ); 
  } catch (error) {
    console.error('Failed to fetch data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});
charactersRouter.get(ROUTES.CHARACTER, async (req, res) => {
  try {
    const dbClient = getDBClient()
    const collection = dbClient.collection('characters'); 
    const data = await collection.find().toArray();
    res.send(data); // Assuming you have a data-page.ejs template
  } catch (error) {
    console.error('Failed to fetch data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

charactersRouter.get(ROUTES.MAJOR_CHARACTER_INFORMATION, async (req, res) => {
  try {
    const dbClient = getDBClient()
    const collection = dbClient.collection('characters');
    const data = await collection.find().toArray();
    const protagonists = data[0]?.protagonists
    const majorCharacters = data[1]?.majorCharacters
    const vanDerLindeGang = data[0]?.vanDerLindeGang
    res.send( { 'majorCharacters': {protagonists, vanDerLindeGang, majorCharacters }}); // Assuming you have a data-page.ejs template
  } catch (error) {
    console.error('Failed to fetch data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default charactersRouter