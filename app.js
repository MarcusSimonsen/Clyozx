const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
const port = 5000

app.use(express.static('public'))
app.use('/css', express.static('public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static('public/images'))

app.use(expressLayouts)
app.set('layout', './layouts/full-width.ejs')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('index', { title: "Clyozx" })
})
app.get('/projects', (req, res) => {
    res.render('projects', { title: "Projects" })
})
app.get('/about', (req, res) => {
    res.render('about', { title: "About" })
})
app.get('/sort_visualizer', (req, res) => {
    res.render('sort_visualizer', { title: "Sort Vizualizer"})
})
app.get('/pi-approximator-darts', (req, res) => {
    res.render('pi_approximator_darts', { title: 'Pi approximator using darts' })
})

app.listen(port, () => console.info(`App listening on port ${port}`))