require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')

const PORT = 3001

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src', 'views'))
hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'))

app.use(express.static(path.join(__dirname, 'public')))



app.get('/', (req, res) => {
  res.render('index')
})


// app.use(function myCors(req, res, next) {
//   const allowOrigins = ['https://imsea.herokuapp.com'];
//   const origin = req.header('Origin');
//   if (allowOrigins.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   next();
// });




app.listen(PORT, () => {
  console.log(`Server has been started on PORT ${PORT}`);
})
