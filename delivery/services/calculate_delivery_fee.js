async function get_coordinates(address) {
    const APIKEY = "c5eb7d2cf609ef6310c942008083737e"
    const axios = require('axios');
    url = "http://api.positionstack.com/v1/forward"
    const params = {
        access_key: APIKEY,
        query: address
    }
    const response = await axios.get('http://api.positionstack.com/v1/forward', { params })
    r = response.data
    result = {}
    result['latitude'] = r.data[0].latitude
    result['longitude'] = r.data[0].longitude
        // .then(response => {
        //     r = response.data
        //     result['latitude'] = r.data[0].latitude
        //     result['longitude'] = r.data[0].longitude
        // }).catch(error => {
        //     console.log(error);
        // });
    console.log(response.data)
    console.log(result)
    return result;
}

function calculate_distance(coordinates) {
    const coord_uece = { "latitude": -3.787956, "longitude": -38.553252};

    if ((coordinates['latitude'] == coord_uece['latitude']) && (coordinates['longitude'] == coord_uece['longitude'])) {
        return 0;
    }
    else {
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
        // if (unit == "N") { dis = dist * 0.8684 }
        return dist;
    }
}


module.exports = {
    calculate: function (address) { 
        // var coordinates = async () => {return await get_coordinates(address)};
        // cepCheck(obj).then(function(resultado){
        //     console.log("Meu resultado é", resultado);
        // })
        // .catch(function(){
        //     console.log("Error");
        // });
        
        /// teste.then(function(resultado){ ...
        get_coordinates(address).then(function(resultado){
            var distance = calculate_distance(resultado);
            console.log(((distance * 0.47)/17).toFixed(2));
            return (distance * 2.47).toFixed(2);
        })
        .catch(function(){
            console.log("Error");
        });
        
        // console.log('v ' + v);
        // console.log(coordinates);
        // var distance = calculate_distance(coordinates);
        // console.log(distance)
        // return (distance * 2.47).toFixed(2);
    }
}
