const axios = require('axios')

const getLugarLatLng = async (dir) => {

  const encondedURL = encodeURI(dir)

  const instance = axios.create({
    baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encondedURL}`,
    headers: {
      'x-rapidapi-key': '7a5811432amsh6c4fc87cf528cf8p1b8f6bjsn66b79e6b3904'
    }
  })

  const response = await instance.get();

  if (response.data.Results === null || response.data.Results.length === 0) {
    throw new Error(`No hay resultados para: ${dir}`)
  }

  const data = response.data.Results[0];
  const direccion = data.name;
  const lat = data.lat;
  const lng = data.lng;

  return {
    direccion,
    lat,
    lng
  }

}

module.exports = {
  getLugarLatLng
}