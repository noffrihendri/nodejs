

var express = require('express')
var router = express.Router()
const authcontroller = require('../controllers/auth');
const user = require('../controllers/user');

const middleware = require('../middleware/middleware');

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

})


// define the about route
router.post('/auth/login', authcontroller.login)
router.get('/auth/logout', middleware.checktoken, authcontroller.logout)

router.get('/user/getalluser', middleware.checktoken,user.getalluser)
router.post('/user/adduser', middleware.checktoken,user.adduser)
router.post('/user/edituser', middleware.checktoken,user.updateuser)
router.post('/user/deleteuser', middleware.checktoken,user.destroy)


// router.post('/login', function (req, res) {
//   res.send('login')
// })


module.exports = router