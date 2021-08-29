import express from "express"
import VaccineCenter from "../models/VaccineCenter.js"

const router = express.Router()

/* Get all centers in the db */
router.get("/allcenters", async (req, res) => {
    try {
        const centers = await VaccineCenter.find({}).populate("transactions").sort({ _id: -1 })
        res.status(200).json(centers)
    }
    catch (err) {
        return res.status(504).json(err);
    }
})

/* Get center by center Id */
router.get("/getcenter/:id", async (req, res) => {
    try {
        const center = await VaccineCenter.findById(req.params.id).populate("transactions")
        res.status(200).json(center)
    }
    catch {
        return res.status(500).json(err)
    }
})

/* Adding center */
router.post("/addcenter", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const newcenter = await new VaccineCenter({
                vaccineCenterName: req.body.vaccineCenterName,
                address: req.body.address,
                enquiryNumber: req.body.enquiryNumber,
                vaccineCountAvailable: req.body.vaccineCountAvailable
            })
            const center = await newcenter.save()
            res.status(200).json(center)
        }
        catch (err) {
            res.status(504).json(err)
        }
    }
    else {
        return res.status(403).json("You dont have permission to add a center!");
    }
})

/* Updating center */
router.put("/updatecenter/:id", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            await VaccineCenter.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Center details updated successfully");
        }
        catch (err) {
            res.status(504).json(err);
        }
    }
    else {
        return res.status(403).json("You dont have permission to update center!");
    }
})

/* Remove center  */
router.delete("/removecenter/:id", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const _id = req.params.id
            const center = await VaccineCenter.findOne({ _id })
            await center.remove()
            res.status(200).json("Center has been deleted");
        } catch (err) {
            return res.status(504).json(err);
        }
    } else {
        return res.status(403).json("You dont have permission to delete a center!");
    }
})

export default router