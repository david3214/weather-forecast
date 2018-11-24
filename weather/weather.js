const request = require('request')

let forecast = (address, callback)=> {
    request({
        url: `https://api.darksky.net/forecast/b6ed713471fee60d36ca8c9c233d00f2/${address.lat},${address.lng}`,
        json: true
    }, (error, response, body)=>{
        if (!error && response.statusCode === 200){
            callback(undefined,{temperature: body.currently.temperature, apparentTemp: body.currently.apparentTemperature})
        }else{
            callback('Unable to fetch weather')
        }
    })
}

module.exports = {
    forecast
}