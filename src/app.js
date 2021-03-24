const express = require('express')
const path = require('path')
const hbs = require ('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials') 

//Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static deirectory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name:'Joshua CS'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Joshua CS'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Joshua CS'
    })
})
app.get('/weather', (req, res) => {

    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    else{
        geocode(address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    address: address,
                    location: location,
                    forecast: forecastData
                })
            })
        })
    }
})
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }

    res.send({
       products: []
        
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Joshua CS'

    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Joshua CS'

    })

})
app.listen(3000, ()=>{
    console.log('Server it up on port 3000')
})

