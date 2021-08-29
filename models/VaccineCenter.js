import mongoose from "mongoose";

const VaccineCenterSchema = new mongoose.Schema({
    vaccineCenterName: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    enquiryNumber: {
        type: Number,
        require: true
    },
    vaccineCountAvailable: {
        type: Number,
        require: true
    },
    transactions: [{
        type: mongoose.Types.ObjectId,
        ref: "Transaction"
    }]
},
    {
        timestamps: true
    })

export default mongoose.model("VaccineCenter", VaccineCenterSchema)