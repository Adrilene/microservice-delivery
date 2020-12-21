async function get_address(cep) {
    const axios = require('axios')
    url = `https://viacep.com.br/ws/${cep}/json/`
    var response = await axios.get(url)
    result = `${response.data['logradouro']}, ${response.data['localidade']} ${response.data['uf']}`
    return result
}

async function get_coordinates(cep) {
    const APIKEY = "c5eb7d2cf609ef6310c942008083737e"
    const axios = require('axios');

    address = await get_address(cep)

    url = "http://api.positionstack.com/v1/forward"
    const params = {
        access_key: APIKEY,
        query: address
    }
    const response = await axios.get(url, { params })
    r = response.data
    result = {}
    result['latitude'] = r.data[0].latitude
    result['longitude'] = r.data[0].longitude
    return result;
}

function calculate_distance(coordinates) {
    const coord_uece = { "latitude": -3.787956, "longitude": -38.553252 };

    if ((coordinates['latitude'] == coord_uece['latitude']) && (coordinates['longitude'] == coord_uece['longitude'])) {
        return 0;
    } else {
        var radlat1 = Math.PI * coordinates['latitude'] / 180;
        var radlat2 = Math.PI * coord_uece['latitude'] / 180;
        var theta = coordinates['longitude'] - coord_uece['longitude'];
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344
        return dist;
    }
}


module.exports = {
    get_coordinates: get_coordinates,

    calculate_distance: calculate_distance
}