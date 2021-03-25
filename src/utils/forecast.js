const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=43ae55f94c3a23b048823934fcb0072d&query=' + latitude + ',' + longitude 
    
    request({ url, json: true }, (error, {body}) => {
        if (error === undefined) {
            callback("unable to connect to internet", undefined)
        } else if (body.error) {
            callback(url, undefined)
        } else {
            callback(undefined, {
                message: 'It is currently ' + body.current.temperature + " and " + body.current.weather_descriptions[0],
                image: body.current.weather_icons[0]
            } )
        }
    })
}
module.exports = forecast
