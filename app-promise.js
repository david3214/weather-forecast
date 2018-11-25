const yargs = require('yargs')
const axios = require('axios')


const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        },
        w: {
            demand: true,
            alias: 'when',
            describe: 'When do you want weather current (c), day(d), week(w))',
            string: true
        
        }
    })
    .help()//Allows us to do --help
    .alias('help', 'h')
    .argv

let printInfo = (data) =>{
    if (argv.when === 'c'){
        let temp = data.currently.temperature;
        let apparentTemp = data.currently.apparentTemperature
        console.log(`Current weather: ${data.currently.summary}`)
        console.log(`Predicted temperature is ${temp} degrees,`)
        console.log(`Apparent Predicted temperature is ${apparentTemp} degrees\n`)
    } else if (argv.when === 'w'){
        let tempHigh = data.daily.data.reduce((tracker, day)=>{
            if(tracker < day.temperatureHigh){
                return day.temperatureHigh
            }
            return tracker
        },-100)
        let tempLow = data.daily.data.reduce((tracker, day)=>{
            if(tracker > day.temperatureLow){
                return day.temperatureLow
            }
            return tracker
        },1000)
        console.log(`Predicted weather: ${data.daily.summary}`)
        console.log(`Predicted temperature range is between ${tempLow}-${tempHigh}`)

    }else {
        temp = data.hourly.data[0].temperature;
        apparentTemp = data.hourly.data[0].apparentTemperature
        console.log(`Predicted weather: ${data.hourly.summary}`)
        console.log(`Predicted temperature is ${temp} degrees,`)
        console.log(`Apparent Predicted temperature is ${apparentTemp} degrees\n`)
    }
}

let encodedAddress = encodeURIComponent(argv.address)
let geoCodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=laS5Gckd0hfyFO57dtOrhLDB0Vt0v0GT&location=${encodedAddress}`

axios.get(geoCodeUrl)
    .then((response)=>{
        if (!response.data.results[0].locations[0].adminArea5){
            //Sends the error to the catch
            throw new Error('Unable to find the address')
        }
        let locations = response.data.results[0].locations[0]
        let lat = locations.latLng.lat
        let lng = locations.latLng.lng

        let formattedAdd = `${locations.adminArea5}, ${locations.adminArea3}` 
        console.log(`\n${formattedAdd}`)

        let weatherURL = `https://api.darksky.net/forecast/b6ed713471fee60d36ca8c9c233d00f2/${lat},${lng}`

        return axios.get(weatherURL)
    }).then((response)=>{

        printInfo(response.data)

    }).catch(e=>{
        if (e.code === 'ENOTFOUND'){
            console.log('Unable to connect to api servers')
        }else{
            console.log(e.message)
        }
    })
// b6ed713471fee60d36ca8c9c233d00f2


    