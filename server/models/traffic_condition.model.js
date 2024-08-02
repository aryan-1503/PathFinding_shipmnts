import mongoose, {model, Schema} from "mongoose";

const TrafficConditionSchema = new Schema({
    road_id: {
        type: mongoose.Types.ObjectId,
        ref: "Road"
    },
    timestamp: {
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
    }
})

const TrafficConditionModel = model("TrafficCondition", TrafficConditionSchema,"traffic_condition");

export { TrafficConditionModel }

