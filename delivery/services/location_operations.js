module.exports = {
    coordinates: function(address_){
        var str2json = require('string-to-json');
    	const APIKEY = "c5eb7d2cf609ef6310c942008083737e"
        const axios = require('axios');
        url = "http://api.positionstack.com/v1/forward"
        const params = {
            access_key: APIKEY,
            query: address_
        }
        result = {}  
        axios.get('http://api.positionstack.com/v1/forward', {params})
        .then(response => {
            r = response.data
            result['latitude'] = r.data[0].latitude
            result['longitude'] = r.data[0].longitude
        }).catch(error => {
            console.log(error);
        });
        
        return result;
    }
}
