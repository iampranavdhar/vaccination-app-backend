import express from "express"
import VaccineCenter from "../models/VaccineCenter.js"
import Transaction from "../models/Transaction.js"

const router = express.Router()

router.post("/book-slot", async (req, res) => {
    try {
        if (req.body.isAdmin === true) {
            const booked = await Transaction.findOne({ userId: req.body.userId });

            if (booked) {
                return res.status(409).send("User aready Booked a Slot.")
            }
            const newtransaction = await new Transaction({
                centerId: req.body.centerId,
                userId: req.body.userId,
                slotDate: req.body.Date,
            })
            const center = await VaccineCenter.findById(req.body.centerId)
            const transaction = await newtransaction.save()
            await center.updateOne({ $push: { transactions: transaction._id } })
            res.status(200).json(transaction)
        }
        else if (req.body.isAdmin === false) {
            res.status(500).json("You are not allowed to add a Transaction")
        }
    }
    catch (err) {
        res.status(504).json(err)
    }
})

router.get("/all-slots-booked", async (req, res) => {
    try {
        const transactions = await Transaction.find({}).sort({ _id: -1 })
        res.status(200).json(transactions)
    }
    catch (err) {
        return res.status(504).json(err)
    }
})

router.put("/update-slot/:id", async (req, res) => {
    try {
        if (req.body.isAdmin) {
            await Transaction.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Transaction details updated successfully");
        }
    }
    catch (err) {
        res.status(504).json(err)
    }
})

router.delete("/remove-slot/:id", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const data = await Transaction.findByIdAndDelete(req.params.id);
            const center = VaccineCenter.findById(data.centerId)
            console.log(center)
            await center.updateOne({ $pull: { transactions: req.params.id } })
            res.status(200).json("Transaction deleted successfully");
        } catch (err) {
            return res.status(504).json(err);
        }
    } else {
        return res.status(403).json("You dont have permission to delete a transaction!");
    }
})

export default router