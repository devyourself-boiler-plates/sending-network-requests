import axios from "axios";

const MassachusettsCoordinates = [42.4072, -71.3824];
const MassachusettsLocationCode = "US-MA"

async function eBirds() {
  // getting data from the eBirds API
  const birds = await axios.get(`https://api.ebird.org/v2/data/obs/${MassachusettsLocationCode}/recent`, {
    headers: {
      "X-eBirdApiToken": "mclcf7614qq8"
    }
  });

  // ensure the leaflet map's height is set (as per the docs)
  const mapDiv = document.getElementById("map");
  mapDiv.style.height = "500px";

  // initializing the map with a view
  const map = L.map('map').setView(MassachusettsCoordinates, 8);
  // applying street map tiles to be placed on the map (this is what makes the map look like a map)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  // for each bird sighting returned by the eBird API, add a marker to the map, then bind a popup to that marker so you can click and see what the bird was
  birds.data.map(birdSighting => {
    // this is how to get use the `lat`/`lng` properties on the bird sighting data structure to put the marker in the right place
    const point = L.marker([birdSighting.lat, birdSighting.lng]).addTo(map);
    // this adds the popup to the marker, with the name of the sighted bird in it
    point.bindPopup(birdSighting.comName).openPopup();
  });

  // this sets the view back to the center of the original region, rather than to the most recently added marker on the map.
  map.setView(MassachusettsCoordinates, 8);
}

eBirds()