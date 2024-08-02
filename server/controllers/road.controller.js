import {RoadModel} from "../models/road.model.js";
import json2csv from "json2csv"
import * as fs from "fs";

const Parser = json2csv.Parser

const addRoad = async (req,res) => {
    const { start_location_id, end_location_id , distance, traffic_condition }  = req.body;
    try{
        const currentDate = new Date();

        const newRoad = new RoadModel({ start_location_id, end_location_id, distance, traffic_condition,timestamp: currentDate });
        await newRoad.save();

        res.status(201).json({ success: true, message: "New Road Added"});
    }catch (error){
        console.log("Internal Server Error : ", error)
    }
}

const updateTraffic = async (req,res) => {
    const { road_id,traffic_condition }  = req.body;
    try{
        const currentDate = new Date()
        const road = await RoadModel.findByIdAndUpdate(road_id,{ traffic_condition,timestamp: currentDate })

        res.status(200).json({ success: true, message: "Traffic Conditions Updated" });
    }catch (error){
        console.log("Internal Server Error : ", error)
    }
}

const getShortestPath = async (req,res) => {
    const { start_location_id, end_location_id }  = req.body;
    try{
        const roads = await RoadModel.find({ start_location_id, end_location_id });
        const filterParameters = [];
        let speed;
        roads.map((road,index) => {
            let weight;
            if(road.traffic_condition === "high"){
                weight = 5;
                speed = 50;
            }
            else if(road.traffic_condition === "moderate"){
                weight = 3
                speed=65
            }else{
                weight = 1
                speed=80
            }
            const filterParameter = road.distance * weight;
            filterParameters.push(filterParameter)
        })

        let mini = Infinity;
        let minIndex = 0
        for(let i = 0; i<filterParameters.length; i++){
            if(filterParameters[i] < mini){
                mini = filterParameters[i]
                minIndex = i;
            }
        }

        const shortestRoad = roads[minIndex];
        const time = roads[minIndex].distance/speed;
        const distance = shortestRoad.distance


        res.status(200).json({ success: true, shortestPath: shortestRoad._id , distance, time });
    }catch (error){
        console.log("Internal Server Error : ", error)
    }
}

const generateTrafficReport = async (req, res) => {
    try {
        const data = await RoadModel.find({}).lean();

        const csvFields = ['_id', 'start_location_id', 'end_location_id', 'distance', 'traffic_condition', 'timestamp'];
        const json2csvParser = new Parser({ csvFields });
        const csvData = json2csvParser.parse(data);

        fs.writeFile("traffic_report.csv", csvData, (error) => {
            if (error) {
                console.log("Error writing CSV:", error);
                throw error; // Throw error to handle it in catch block
            }
            console.log("Write to traffic_report.csv successful!");
            res.send('File downloaded Successfully');
        });
    } catch (error) {
        console.log("Internal Server Error:", error);
        res.status(500).send("Internal Server Error");
    }
};
export { addRoad, updateTraffic, getShortestPath, generateTrafficReport }