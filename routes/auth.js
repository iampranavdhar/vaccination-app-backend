import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const router = express.Router()

/* User Registration */
router.post("/register", async (req, res) => {
    try {
        /* Salting and Hashing the Password */
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        /* Create a new user */
        const newuser = await new User({
            userFullName: req.body.userFullName,
            age: req.body.age,
            dob: req.body.dob,
            gender: req.body.gender,
            address: req.body.address,
            aadharNumber: req.body.aadharNumber,
            mobileNumber: req.body.mobileNumber,
            email: req.body.email,
            password: hashedPass,
            isAdmin: req.body.isAdmin
        });

        /* Save User and Return */
        const user = await newuser.save()
        res.status(200).json(user)
    }
    catch (err) {
        console.log(err)
    }
})

/* User Login */
router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })

        !user && res.status(404).json("User not found");

        const validPass = await bcrypt.compare(req.body.password, user.password)
        !validPass && res.status(400).json("Wrong Password")

        res.status(200).json(user)

    } catch (err) {
        console.log(err)
    }
})

export default router