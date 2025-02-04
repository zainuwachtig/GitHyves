const express = require('express')
const passport = require('passport');
require('../modules/passportModule.js')(passport);

const router = express.Router()

router
.get('/', (req, res) => {
    res.render('login')
  })

  //failed auth: route
.get("/login", (req, res) => {
  console.log("you are not authorized")
})

//successful auth: route
.get("/success", (req, res) => {

  res.render('welcome')
})

.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
)

.get('/github/callback', 
  passport.authenticate('github', {
    failureRedirect: '/login' }),
  function(req, res) {
    res.render('welcome', {
      user: req.user._json
    })
  })



module.exports = router