import express from 'express';
import { getDBClient } from '../database.js';
import { ROUTES } from '../constants/route.js';
const characterInformationRouter = express.Router();
// Middleware
characterInformationRouter.use((req, res, next) => {
  next();
});

characterInformationRouter.post(ROUTES.CHARACTER_INFORMATION, async (req, res) => {
    const {name} = req.body;
     if (!name) {
      res.status(400).send('Name is required.');
      return;
    }

  try {
    const dbClient = getDBClient()
    const collection = dbClient.collection('character_information');
      const user = await collection.findOne({ "character": name });

    if (!user) {
        res.status(404).send('User not found.');
        return;
      }

      res.send({user});
  } catch (error) {
    console.error('Failed to fetch data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default characterInformationRouter