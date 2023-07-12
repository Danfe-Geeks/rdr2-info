import express from 'express';
import { getDBClient } from '../database.js';
const weaponsRouter = express.Router();
// Middleware
weaponsRouter.use((req, res, next) => {
  console.log('Working');
  next();
});

// Route to fetch data from MongoDB collection and display it in a new page
weaponsRouter.get('/get/weapons', async (req, res) => {
  try {
    const dbClient = getDBClient()
    const collection = dbClient.collection('weapons'); // Replace with your collection name

    const data = await collection.find().toArray();
    res.send(data); // Assuming you have a data-page.ejs template
  } catch (error) {
    console.error('Failed to fetch data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

weaponsRouter.post('/get/weapons/information', async (req, res) => {
    const {weaponName} = req.body;
     if (!weaponName) {
      res.status(400).send('Name is required.');
      return;
    }

  try {
    const dbClient = getDBClient()
    const collection = dbClient.collection('weapons');
      const data = await collection.find().toArray();
        


    if (!weaponName) {
        res.status(404).send('Weapon Name is not found.');
        return;
      }

      res.send({data});
  } catch (error) {
    console.error('Failed to fetch data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default weaponsRouter