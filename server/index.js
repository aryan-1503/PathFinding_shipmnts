import express, {urlencoded} from "express"
import cors from "cors"
import "dotenv/config"
import {connectToDB} from "./utils/connectToDB.js";
import {locationRouter} from "./routes/location.route.js";
import {roadRouter} from "./routes/road.route.js";

const app = express();
await connectToDB()

const PORT = process.env.PORT || 3000
// const currentDate = new Date()
// console.log(currentDate)
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))

app.use(express.json());
app.use(urlencoded({ extended: false }));

//Routers

app.use("/api/location",locationRouter)
app.use("/api/roads",roadRouter)



app.get("/",(req, res) => {
    res.status(201).send("Health Check")
})


app.listen(PORT,() => {
    console.log(`SERVER RUNNING ON ${PORT}`)
})