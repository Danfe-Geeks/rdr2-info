import express from 'express'
import {connectToDatabase} from './database.js'
import charactersRouter from './routes/characters.js'

const app = express();
const port = 8080;

// Connect to MongoDB
connectToDatabase();

// Use routes
app.use('/', charactersRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
