import {model, Schema} from "mongoose";

const RoadSchema = new Schema({
    start_location_id: {
        type: String,
        required: true
    },
    end_location_id: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    traffic_condition: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    }
})

const RoadModel = model("Road", RoadSchema,"road");

export { RoadModel }

