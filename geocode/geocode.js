const request = require('request')

let geocodeAddress = (address, callback)=>{
    let encodedAddress = encodeURIComponent(address)

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=laS5Gckd0hfyFO57dtOrhLDB0Vt0v0GT&location=${encodedAddress}`,
        json: true
    }, (error, response, body)=>{
        if (error){
            callback('Unable to connect to Google servers.')
        }else if(!body.results[0].locations[0].adminArea5){
            callback('Unable to find that address')
        }else{
            let locations = body.results[0].locations[0]
            callback(undefined, {
                address: `${locations.street} ${locations.adminArea5}, ${locations.adminArea3}`,
                city: `${locations.adminArea5}`,
                lat: locations.latLng.lat,
                lng: locations.latLng.lng
            })
        }
    })
}

module.exports = {
    geocodeAddress
}