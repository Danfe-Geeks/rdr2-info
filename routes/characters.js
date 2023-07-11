import express from 'express';
import { getDBClient } from '../database.js';
const charactersRouter = express.Router();
// Middleware
charactersRouter.use((req, res, next) => {
  console.log('Working');
  next();
});

// Route to fetch data from MongoDB collection and display it in a new page
charactersRouter.get('/getdata', async (req, res) => {
  try {
    const dbClient = getDBClient()
    const collection = dbClient.collection('characters'); // Replace with your collection name

    const data = await collection.find().toArray();
    res.send({ data }); // Assuming you have a data-page.ejs template
  } catch (error) {
    console.error('Failed to fetch data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default charactersRouter