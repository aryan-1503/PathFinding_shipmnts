# PathFinding_shipmnts
<h2>Setup</h2>
Run these commands
<ul>
 <li><code>git clone https://github.com/aryan-1503/PathFinding_shipmnts.git</code></li>
<li><code>cd server; npm i</code></li>
<li><code>npm run dev</code></li>
</ul>

## Project Structure

<img src="./imagesforReadme/1.png">

 - This Project follow MVC structure in ExpressJS

## Schema Defination

1. Location Model

<img src="./imagesforReadme/6.png">

2. Road Model

<img src="./imagesforReadme/7.png">

## API

<h3>List of api created</h3>
Add Location
- POST : api/location

<img src="./imagesforReadme/addLocation.png" alt="">

Add Road between locations

- POST : api/roads

<img src="./imagesforReadme/3.png" alt="">

Updates the traffic condition

- PATCH : api/roads/{id}


Finds the Shortest Path

- GET : api/roads/shortest-path

<img src="./imagesforReadme/4.png">

Generate the Traffic Report 

- GET : api/roads/report/traffic

<img src="./imagesforReadme/5.png">



