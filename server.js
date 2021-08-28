import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"

/* App Config */
dotenv.config()
const app = express()
const port = process.env.PORT || 5000

/* Middlewares */
app.use(express.json())
app.use(cors())

/* API Routes */
app.use("/api/auth", authRoutes)

/* MongoDB connection */
mongoose.connect(
    process.env.MONGO_URL,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("MONGODB CONNECTED");
    }
);

app.get('/', (req, res) => {
    res.status(200).send("Welcome to VaccinationApp")
})

/* Port Listening In */
app.listen(port, () => {
    console.log("Server is running in PORT 5000");
});