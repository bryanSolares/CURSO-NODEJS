const express = require('express')
const app = express()

const path = require('path')
const hbs = require('hbs')
require('./hbs/helpers')

const port = process.env.PORT || 3000

app.set(express.static(path.join(__dirname, '/public')))

//Express HBS engine
app.set('views', path.join(__dirname, '/views'))
hbs.registerPartials(path.join(__dirname, '/views/parciales'))
app.set('view engine', 'hbs')


app.listen(port, (error) => {
  console.log(`Escuchando en puerto ${port}`);
});

app.get('/', (req, res) => {
  res.render('home', {
    nombre: 'bryAn jOsUe SoLarEs'
  })
})

app.get('/about', (req, res) => {
  res.render('about')
})

/************************************/