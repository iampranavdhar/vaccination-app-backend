import mongoose from "mongoose"

const TransactionSchema = new mongoose.Schema({
    centerId: {
        type: String,
        require: true
    },
    userId: { //EmployeeId or AdmissionId
        type: String,
        require: true
    },
    Date: {
        type: String,
        require: true,
    },
    vaccineStatus: {
        type: String,
        default: "Not Done"
    }
},
    {
        timestamps: true
    }
);

export default mongoose.model("Transaction", TransactionSchema)