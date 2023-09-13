import axios from 'axios';


const getGeoLocation = async (ipAddress) => {
  try {
    const apiKey = process.env.API_KEY_FOR_LOCATION
    const apiUrl = `https://api.ip2location.io/?key=${apiKey}&ip=${ipAddress}&format=json`;
    console.log(apiUrl, "apiUrl")
    const response = await axios.get(apiUrl);
    console.log(response, "response")
    const data = response.data;

    return data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

export default getGeoLocation;  // Export the function as default
