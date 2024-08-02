import "dotenv/config"
import mongoose from "mongoose";

const connectToDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Connected to Database!"))
        .catch((error) => console.log("Error Connecting to database : ",error))
};

export { connectToDB }