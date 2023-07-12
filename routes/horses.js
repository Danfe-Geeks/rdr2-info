import express from 'express';
import { getDBClient } from '../database.js';
import { ROUTES } from '../constants/route.js';
const horsesRouter = express.Router();
// Middleware
horsesRouter.use((req, res, next) => {
  console.log('Working');
  next();
});

// Route to fetch data from MongoDB collection and display it in a new page
horsesRouter.get(ROUTES.HORSES, async (req, res) => {
  try {
    const dbClient = getDBClient()
    const collection = dbClient.collection('horses'); // Replace with your collection name

    const data = await collection.find().toArray();
    res.send(data);
  } catch (error) {
    console.error('Failed to fetch data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

horsesRouter.post(ROUTES.HORSE_INFORMATION, async (req, res) => {
    const {horseName} = req.body;
    
     if (!horseName) {
      res.status(400).send('Name is required.');
      return;
    }

  try {
    const dbClient = getDBClient()
    const collection = dbClient.collection('horses');
    const data = await collection.find().toArray()
    const userHorseInfo = data[1].horses_info.filter(horse => {
        const horseNameArray = horseName.split(",").map(name => name.trim());
        return horseNameArray.includes(horse.name);
    })



    if (!horseName) {
        res.status(404).send('Horses Name is not found.');
        return;
      }

      res.send(userHorseInfo);
  } catch (error) {
    console.error('Failed to fetch data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default horsesRouter