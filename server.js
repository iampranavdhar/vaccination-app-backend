import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import vaccineCenterRoutes from "./routes/vaccineCenters.js"
import transactionRoutes from "./routes/transactions.js"
import pdfRoutes from "./routes/pdf.js"
import cookieParser from "cookie-parser"



/* App Config */
dotenv.config()
const app = express()
const port = process.env.PORT || 5000

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

/* Middlewares */
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser());


/* API Routes */
app.use("/api/auth", authRoutes)
app.use("/api/centers", vaccineCenterRoutes)
app.use("/api/slots", transactionRoutes)
app.use("/api/pdf", pdfRoutes)
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