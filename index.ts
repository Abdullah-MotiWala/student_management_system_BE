import express, { json } from "express"
import router from "./routes"
import { connectDB } from "./db"
import { config as configEnv } from "dotenv"

configEnv()
connectDB()

const app = express()
const PORT = 5000 || process.env.PORT
const HOST = '127.0.0.1' || process.env.HOST

app.use(json())

app.get("/", (req, res) => {
    res.send("Application is live")
})

app.use("/api", router)

app.listen(PORT, HOST, () => {
    console.log(`Application running on ${HOST}:${PORT}`);
})