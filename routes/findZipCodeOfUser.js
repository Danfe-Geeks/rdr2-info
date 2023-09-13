import express from 'express'
import axios from 'axios';
// import  getGeoLocation  from '../upstream-api/geoLocation';


// const cspPolicy = "default-src 'self' https://api.ip2location.io;";


const getGeoLocation = async (ipAddress) => {
  try {
    const apiKey = process.env.API_KEY_FOR_LOCATION
    const apiUrl = `https://api.ip2location.io/?key=${apiKey}&ip=${ipAddress}&format=json`;
    console.log(apiUrl, "apiUrl")
    const response = await axios.get(apiUrl);
    const data = response.data;

    return data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error; // Re-throw the error to handle it in the calling code
  }
};


export const findZipCodeOfUserRouter = express.Router();

findZipCodeOfUserRouter.use((req, res, next) => {
  console.log('Working');
    // res.setHeader('Content-Security-Policy', cspPolicy);

  next();
}
);

// findZipCodeOfUserRouter.get('/get-zip-code', (req, res) => {
//   // Get the user's IP address from the request headers
//     const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;


//   if (ip) {
//     const getLocation = getGeoLocation(ip)
//     res.json({ getLocation });

//   } else {
//     res.status(500).json({ error: 'ZIP code not found for this IP address' });
//   }
// });


findZipCodeOfUserRouter.get('/get-zip-code', async (req, res) => {
  // Get the user's IP address from the request headers
  console.log(req.headers, "req.headers")
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(ip)
  try {
    if (ip) {
        // do without await
      const location =  await getGeoLocation(ip) // Await the asynchronous function
      const zipCode = location?.zip_code
      const countryCode = location?.country_code;

      if(countryCode !== "US") res.status(403).json({ error: '403: Access Denied' });
      const sendThisResponse = { zipCode, location: `You are from ${location?.region_name}` }
      res.json(sendThisResponse); // Send the location data as JSON response
    } else {
      res.status(500).json({ error: 'ZIP code not found for this IP address' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching location data' });
  }
});

// send the data based on the zip code

// sendDataBasedOnZipCode.get('/get-zip-code/:zip-code', async (req, res) => {
