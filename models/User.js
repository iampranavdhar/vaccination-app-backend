import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userFullName: {
        type: String,
        require: true,
        unique: true
    },
    age: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    dob: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true,
    },
    aadharNumber: {
        type: Number,
        require: true
    },
    mobileNumber: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        max: 50
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    }
},
    {
        timestamps: true
    });

export default mongoose.model("User", UserSchema);