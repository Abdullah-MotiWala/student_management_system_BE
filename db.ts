import mongoose from "mongoose"
import { config as configEnv } from "dotenv"

configEnv()

const db_uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.sp6ryfa.mongodb.net/?retryWrites=true&w=majority`

export const connectDB = async () => {
    try {
        await mongoose.connect(db_uri)
        console.log("DB Connected")
    } catch (err) {
        console.log("err", err)
    }
}