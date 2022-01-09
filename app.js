require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const PORT = 3001
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src', 'views'))
hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'))

app.use(express.static(path.join(process.env.PWD, 'public')))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`Server has been started on PORT ${PORT}`);
})
