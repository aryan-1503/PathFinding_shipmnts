const getShortestPath = async (req, res) => {
    const { location_ids } = req.body; // Array of location IDs
    try {
        let totalDistance = 0;
        let totalTime = 0;
        const path = [];

        for (let i = 0; i < location_ids.length - 1; i++) {
            const start_location_id = location_ids[i];
            const end_location_id = location_ids[i + 1];

            const roads = await RoadModel.find({ start_location_id, end_location_id });
            const filterParameters = [];
            let speed;

            roads.map((road) => {
                let weight;
                if (road.traffic_condition === "high") {
                    weight = 5;
                    speed = 50;
                } else if (road.traffic_condition === "moderate") {
                    weight = 3;
                    speed = 65;
                } else {
                    weight = 1;
                    speed = 80;
                }
                const filterParameter = road.distance * weight;
                filterParameters.push(filterParameter);
            });

            let mini = Infinity;
            let minIndex = 0;
            for (let j = 0; j < filterParameters.length; j++) {
                if (filterParameters[j] < mini) {
                    mini = filterParameters[j];
                    minIndex = j;
                }
            }

            const shortestRoad = roads[minIndex];
            const time = shortestRoad.distance / speed;

            totalDistance += parseFloat(shortestRoad.distance);
            totalTime += time;
            path.push(start_location_id);
            if (i === location_ids.length - 2) {
                path.push(end_location_id);
            }
        }

        res.status(200).json({
            success: true,
            path,
            total_distance: totalDistance,
            estimated_time: totalTime
        });
    } catch (error) {
        console.log("Internal Server Error: ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
