import express from "express"
import cors from "cors"
import blockchain from "./api/blockchain.route.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/blockchain", blockchain)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app