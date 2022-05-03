const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET } = require('../../config/secrets')
const Users = require('../users/users-model')
const { checkUserNameUnique, checkUserNameExists, checkUserBody }  = require('../middleware/authMiddleware')

//this post request creates a new user, upon creation of a new user the password is hashed 
router.post('/register', checkUserBody, checkUserNameUnique, async (req, res, next) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8) //DO NOT EXCEED 2^8 ROUNDS OF HASHING!
  const user = { username, password: hash }
  try {
    const newUserRec = await Users.add(user)
    res.status(201).json(newUserRec)
  } catch (error) {
    next(error)
  }
});
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */



  
// upon login, this post request generates a new JWT token that expires in one day. If the credentials are valid that you can login successfully. otherwise you will not be able to log in. 
router.post('/login', checkUserBody, checkUserNameExists, (req, res, next) => {
  const user = req.user
  const { password } = req.body
  const validCredentials = bcrypt.compareSync(password, user.password)

  const generateToken = user => {
    const payload = {
      subject: user.id,
      username: user.username,
    }
    const options = {
      expiresIn: '1d'
    }
    return jwt.sign(payload, JWT_SECRET, options)
  }

  if (validCredentials) {
    res.status(200).json({
      message: `welcome, ${user.username}`,
      token: generateToken(user)
    })
  } else {
    next({ status: 401, message: 'invalid credentials' })
  }
});


module.exports = router;
