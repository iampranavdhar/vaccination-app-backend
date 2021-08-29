import express from 'express';
import pdf from 'pdf-creator-node'
import fs from 'fs'
import User from '../models/User.js';
import { resolveSoa } from 'dns';

const router = express.Router()

router.post("/pdf", async (req, res) => {
    try {
        const aadharNumber = req.body.aadharNumber;
        console.log(req.body);
        const user = await User.findOne({
            aadharNumber : aadharNumber
        })
        if(!user) {
            return res.status(400).send("User not found")
        }

        var html = fs.readFileSync("template.html", "utf8");

        var options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm",
                contents: '<div style="text-align: center;">Vaccine Certificate</div>'
            },
            footer: {
                height: "28mm",
                contents: {
                    // first: '',
                    // default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                    // last: 'Last Page'
                }
            }
        };
        var details = [
            {
            name: user.UserFullName,
            age: user.age,
            gender: user.gender,
            dob: user.dob,
            aadharNumber:user.aadharNumber,
            address: user.address,
            mobile:user.mobileNumber,
            email:user.email,
            vaccinated:false,
            },
        ];
        var document = {
            html: html,
            data: {
            details: details,
            },
            path: `./${user.aadharNumber}.pdf`,
            type: "",
        };
        await pdf
        .create(document, options)
        
        res.download(`./${user.aadharNumber}.pdf`);
    }
    catch (err) {
        console.log(err)
    }
})

export default router