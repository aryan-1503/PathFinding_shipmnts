import {model, Schema} from "mongoose";

const LocationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    }
})

const LocationModel = model("Location", LocationSchema,"locations");

export { LocationModel }

