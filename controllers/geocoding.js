const util = require('util');
// Initialize Google Maps Client
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBohcD2NS484GvJAikGTkbS4X68iQq6qC4'
});

// Promisify Google Map clients functions
const geocode = util.promisify(googleMapsClient.geocode);
const placesNearby = util.promisify(googleMapsClient.placesNearby);

exports.search = async function (req, res, next) {
  const cityName = req.body.city;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  if (cityName) {
    // If city name exist geocode and search
    const city = await searchByCityName(cityName)
    if(!city){
      return res.status(404).send({ error: 'No tenemos resultados para su busqueda' });
    }
    // Extract lat and long for search places
    const {lat, lng} = city.geometry.location;
    const results = await searchByLocation(lat, lng);
    res.json({results});

  }else if (latitude && longitude) {

    const results = await searchByLocation(latitude, longitude);
    res.json({results});

  } else {
    return res.status(400).send({ error: 'Debes ingresar Nombre de Ciudad o Latitud y Longitud' });
  }
};

/** 
 * searchByCityName
 * * Search Restaurants by City Name, this method geocode
 * * the name of a city and search in places by lat and lng params. 
 * @param cityName String Name a City.
*/
async function searchByCityName(cityName) {
  try {
    const response = await geocode({
      address: cityName
    });
    if (response.json.results.length == 0) {
      return;
    }
    return response.json.results[0];
  }
  catch (error) {
    console.log(error);
    return;
  }
}

/** 
 * searchByLocation
 * * Search Restaurants by Latitude and Longitude, this method get
 * * a list of restaurants given latitude and longitude params. 
 * @param lat Double Cordinate Latitude.
 * @param lng Double Cordinate Longitude.
*/
async function searchByLocation(lat, lng) {
  try {
    const response = await placesNearby(
      {
        language: 'es',
        location: [lat, lng],
        radius: 5000,
        type: 'restaurant'
      }
    )
    if (response.json.results.length == 0) {
      return;
    }
    return response.json.results;
  }
  catch (error) {
    console.log(error);
    return;
  }
}