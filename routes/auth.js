import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const router = express.Router()

/* User Registration */
router.post("/register", async (req, res) => {
    try {
        /* Salting and Hashing the Password */
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        const oldUser = await User.findOne({ email: req.body.email });

        if (oldUser) {
            return res.status(409).send("User aready Exists.Please Login")
        }

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

        // Create User Token
        const token = jwt.sign(
            { user_id: user._id, email: req.body.email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        res.cookie("token", token, {
            httpOnly: true
        }).status(200).json(user)
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

        const token = jwt.sign(
            { user_id: user._id, email: req.body.email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        res.cookie("token", token, {
            httpOnly: true
        }).status(200).json(user)

    } catch (err) {
        console.log(err)
    }
})

export default router