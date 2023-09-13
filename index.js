import express from 'express'
import {connectToDatabase} from './database.js'
import charactersRouter from './routes/characters.js'
import characterInformationRouter from './routes/characterInformation.js';
import cors from 'cors'
import weaponsRouter from './routes/weapons.js';
import horsesRouter from './routes/horses.js';
import dotenv from 'dotenv'
import { findZipCodeOfUserRouter } from './routes/findZipCodeOfUser.js';


const app = express();
app.use(cors())
app.use(express.json())
const port = 8080;
dotenv.config();

// Connect to MongoDB
connectToDatabase();



// Use routes
app.use('/', charactersRouter);
app.use('/', characterInformationRouter)
app.use('/', weaponsRouter)
app.use('/', horsesRouter)
app.use('/', findZipCodeOfUserRouter)

app.use((req, res, next) => { 
  
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
