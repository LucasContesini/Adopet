import axios from 'axios';
export default class GeolocationHelper {

    static async getCityByLatAndLong(latitude, longitude) {
        var response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`);
        return response.data.address.city;
    }
  
}
  