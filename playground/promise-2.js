const request = require('request')

var geocodeAddress = (address) => {
    return new Promise((resolve, reject)=>{
        let encodedAddress = encodeURIComponent(address)

        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=laS5Gckd0hfyFO57dtOrhLDB0Vt0v0GT&location=${encodedAddress}`,
            json: true
        }, (error, response, body)=>{
            if (error){
                reject('Unable to connect to Google servers.')
            }else if(!body.results[0].locations[0].adminArea5){
                reject('Unable to find that address')
            }else{
                let locations = body.results[0].locations[0]
                resolve({
                    address: `${locations.street} ${locations.adminArea5}, ${locations.adminArea3}`,
                    city: `${locations.adminArea5}`,
                    lat: locations.latLng.lat,
                    lng: locations.latLng.lng
                })
            }
        })
    })
}

geocodeAddress('00000')
    .then((location)=>{
        console.log(JSON.stringify(location, undefined, 2))
    }).catch((errorMessage)=>{
        console.log(errorMessage);  
    })