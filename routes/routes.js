

var express = require('express')
var router = express.Router()
const authcontroller = require('../controllers/auth');
const testing = require('../controllers/testing');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('selamat datang')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})


// define the about route
router.post('/auth/login', authcontroller.login)
router.get('/testing', testing.halo)

// router.post('/login', function (req, res) {
//   res.send('login')
// })


module.exports = router