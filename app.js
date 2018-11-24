const request = require('request')
const yargs = require('yargs')

const weather = require('./weather/weather.js')
const geocode = require('./geocode/geocode')

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()//Allows us to do --help
    .alias('help', 'h')
    .argv

geocode.geocodeAddress(argv.address, (error, geoResult)=>{
    if(error){
        console.log(error)
    }else{
        console.log(geoResult.address)
        weather.forecast(geoResult, (weatherError, weatherResult)=>{
            if(weatherError){
                console.log(weatherError)
            }else{
                console.log(`The Temperature is ${weatherResult.temperature} degrees,`,
                `but if feels like ${weatherResult.apparentTemp} degrees`)
            }
        })
    }
})



// b6ed713471fee60d36ca8c9c233d00f2


    