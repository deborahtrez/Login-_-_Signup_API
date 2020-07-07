const express = require ('express')
const router = express.Router()
const User = require('../models/usersModel')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { signupcheck, logincheck } = require('../authValidation')

router.get('/', (request, response) => {
    response.send("our routes are working")
})

//sign up a new user
router.post('/signup', async (request, response) => {
    
    const {error} = signupcheck(request.body)
    if(error) {
        return response.status(400).send(error.details[0].message)
    }

    const existingEmail = await User.findOne({email : request.body.email})
    if (existingEmail) {
        return response.status(400).send('Email already exists')
    }

    const saltPassword = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(request.body.password, saltPassword)

    const person = new User ({
        username:request.body.username,
        email:request.body.email,
        password:hashedPassword,
        gender:request.body.gender,
        country:request.body.country,
        profession:request.body.profession
    })
    person.save()
    .then (data => { response.json(data)})
    .catch (error => { response.json(error)})
})

//login a user
router.post('/login', async (request, response) => {
    const {error} = logincheck(request.body)
    if(error) {
        return response.status(400).send(error.details[0].message)
    }

    const theUser = await User.findOne({email: request.body.email})
    if (!theUser) {
        response.status(400).send("Invalid Email")
    }

    const thePassword = await bcrypt.compare(request.body.password, theUser.password)
    if(!thePassword) {
        response.status(400).send("Wrong Password")
    }

    const usersToken = jwt.sign({_id:theUser.id}, process.env.TOKEN)
    response.header('authentication_id', usersToken).send(usersToken)

    response.send('You have logged in sucessfully')
})
module.exports = router
