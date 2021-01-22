const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ritika Shrestha, Umang Harlalka, Anand Jaiswal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Meet Our Team',
        name: 'Ritika Shrestha, Umang Harlalka, Anand Jaiswal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Ritika Shrestha, Umang Harlalka, Anand Jaiswal'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "please provide your address"
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, place} = {})=>{
        if(error){
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forecastdata)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastdata,
                place,
                address: req.query.address,
                longitude,
                latitude

            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ritika Shrestha, Umang Harlalka, Anand Jaiswal',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ritika Shrestha, Umang Harlalka, Anand Jaiswal',
        errorMessage: 'Page not found.'
    })
})

// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})