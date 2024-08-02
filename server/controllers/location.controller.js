import {LocationModel} from "../models/location.model.js";

const addLocation = async (req,res) => {
    const { name, latitude, longitude } = req.body;
    try{
        const location = await LocationModel.findOne({ name });
        if (location) {
            return res.status(400).json({ success: false, message: "Location already exists" })
        }

        const newLocation = new LocationModel({ name, latitude, longitude })
        await newLocation.save();

        return res.status(201).json({ success: true, message: "New location added"})
    }catch (error) {
        console.log("Internal Server Error : ", error)
    }
}

const getLocation = async (req,res) => {
    const { id } = req.params;
    try{
        const location = await LocationModel.findById(id);
        if (!location) {
            return res.status(404).json({ success: false, message: "Location not found" })
        }

        return res.status(200).json({ success: true, location})
    }catch (error) {
        console.log("Internal Server Error : ", error)
    }
}

export { addLocation, getLocation }