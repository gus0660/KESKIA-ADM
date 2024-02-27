
const map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([5.60449, 43.17436]),
    zoom: 10,
  }),
});

async function getCoordinatesFromAddress(address) {
  var apiKey = "5b3ce3597851110001cf6248265456eaefdf40ca9d7ce5ce7a189570";

  try {
      const response = await fetch(
          `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}`
      );
      const data = await response.json();
        // console.log(data)
      if (data.features && data.features.length > 0) {
          // console.log(data.features)
          const firstFeature = data.features[0];
          const coords = firstFeature.geometry.coordinates;
          // Les coordonnées sont retournées sous forme [longitude, latitude]
          return [coords[0], coords[1]];
      } else {
          // Gérer le cas où aucune fonctionnalité n'est trouvée
          console.log("Aucune adresse trouvée");
          return null;
      }
  } catch (error) {
      console.error("Erreur lors du géocodage: ", error);
      return null;
  }
}

async function showLocation(address) {
  let coords;

  if (address) {
      console.log("Géocodage de l'adresse: ", address);
      // Géocodage de l'adresse
      coords = await getCoordinatesFromAddress(address);

      // Si aucune coordonnée n'est trouvée pour l'adresse
      if (!coords) {
          console.log("Aucune coordonnée trouvée pour l'adresse: ", address);
          alert("Adresse non trouvée: " + address);
          return null;
      }
  } else {
      console.log("Utilisation de la géolocalisation pour l'utilisateur actuel.");
      console.log("Coordonnées obtenues: ", coords);
      // Utiliser la géolocalisation
      try {
          const position = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          coords = [position.coords.longitude, position.coords.latitude];
      } catch (error) {
          console.log("Erreur de géolocalisation: ", error);
          alert("Erreur de géolocalisation: " + error.message);
          return null;
      }
  }
  
  // Inverser l'ordre des coordonnées
  // coords = [coords[1], coords[0]];
  // console.log("Coordonnées inversées: ", coords);
  
  console.log(coords);
  let formattedCoords = formatCoordsForAPI(coords);
  displayOnMap(coords);
  return formattedCoords;
}
  
function formatCoordsForAPI(coords) {
  
  return coords.map(c => c.trim());
}
function formatCoordsForAPI(coords) {
  return coords.map(c => c.toString().trim()).join(',');
}

function displayOnMap(coords) {
  var olCoords = ol.proj.fromLonLat(coords);
  map.getView().animate({center: olCoords, zoom: 16});

  var iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
          src: 'images/icon_marqueur.png',
          scale: 0.5
      })
  });

  var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(olCoords)
  });
  iconFeature.setStyle(iconStyle);

  var layer = new ol.layer.Vector({
      source: new ol.source.Vector({
          features: [iconFeature]
      })
  });

  map.addLayer(layer);
}

async function showMyLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Format the coordinates for the API
          const formattedCoords = formatCoordsForAPI([longitude, latitude]);

          // Convertir les coordonnées pour OpenLayers
          var olCoords = ol.proj.fromLonLat([longitude, latitude]);

          // Style de l'icône
          var iconStyle = new ol.style.Style({
              image: new ol.style.Icon({
                  src: "images/icon_marqueur.png",
                  scale: 0.5
              }),
          });

          // Créer la fonctionnalité avec l'icône
          var iconFeature = new ol.Feature({
              geometry: new ol.geom.Point(olCoords),
          });
          iconFeature.setStyle(iconStyle);

          // Créer et ajouter la couche vectorielle
          var layer = new ol.layer.Vector({
              source: new ol.source.Vector({
                  features: [iconFeature],
              }),
          });

          map.addLayer(layer);

          // Centre la vue sur la position de l'utilisateur
          map.getView().animate({center: olCoords, zoom: 10});

      }, (error) => {
          console.error("Erreur lors de l'obtention de la position : ", error);
      });
  } else {
      console.error("La géolocalisation n'est pas prise en charge par ce navigateur.");
  }
}

// Variables globales pour stocker les coordonnées
let startPoint = null;
let endPoint = null;

async function setStartPoint() {
  const address = document.getElementById('startAddress').value;
  console.log("Définition du point de départ pour l'adresse: ", address);

  if (address) {
    // Si une adresse est fournie, utilisez showLocation pour cette adresse
    console.log("Utilisation de showLocation pour l'adresse: ", address);
    await showLocation(address);
} else {
    // Si aucune adresse n'est fournie, utilisez showMyLocation pour obtenir la position actuelle
    console.log("Utilisation de showMyLocation pour obtenir la position actuelle");
    await showMyLocation();
}

  const coords = await showLocation(address);
  console.log("Coordonnées du point de départ: ", coords);

  startPoint = coords;

  return coords;
}

async function setEndPoint() {
  const address = document.getElementById('endAddress').value;
  console.log("Définition du point d'arrivée pour l'adresse: ", address);
  const coords = await showLocation(address);
  console.log("Coordonnées du point d'arrivée: ", coords);
  endPoint = coords;

  return coords;
}

function handleRouteCalculation() {
  console.log("Calcul de l'itinéraire en cours...");
  Promise.all([setStartPoint(), setEndPoint()])
      .then((values) => {
          console.log("Valeurs récupérées après promesses: ", values);
          const [startCoords, endCoords] = values;
          // Affecter les valeurs aux variables globales
          startPoint = startCoords;
          endPoint = endCoords;
          console.log("startPoint:", startPoint, "endPoint:", endPoint);
          if (!startPoint || !endPoint) {
            alert("Veuillez spécifier à la fois un point de départ et un point d'arrivée.");
            return;
          }
          calculateAndDisplayRoute(startPoint, endPoint);
      })
      .catch(error => {
          console.error("Erreur lors de la définition des points de départ/arrivée", error);
      });
}

async function calculateAndDisplayRoute(startPoint, endPoint) {
  // Log pour vérifier si startPoint et endPoint sont des tableaux
  console.log("Is startPoint an array?", Array.isArray(startPoint));
  console.log("Is endPoint an array?", Array.isArray(endPoint));

  if (!Array.isArray(startPoint) || !Array.isArray(endPoint) || startPoint.length !== 2 || endPoint.length !== 2) {
      alert("Veuillez spécifier à la fois un point de départ et un point d'arrivée.");
      return;
  }
  console.log("startPoint:", startPoint, "endPoint:", endPoint);
  if (!startPoint || !endPoint || startPoint.length !== 2 || endPoint.length !== 2) {
      alert("Veuillez spécifier à la fois un point de départ et un point d'arrivée.");
      return;
  }

  const apiKey = "5b3ce3597851110001cf6248265456eaefdf40ca9d7ce5ce7a189570";
  const requestBody = {
      coordinates: [startPoint, endPoint],
      profile: "driving-car",
      format: "json",
  };

  try {
      const response = await fetch("https://api.openrouteservice.org/v2/directions/driving-car", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: apiKey,
          },
          body: JSON.stringify(requestBody),
      });
      const data = await response.json();

      if (data.features && data.features.length > 0) {
          const route = data.features[0];
          const routeGeometry = new ol.format.GeoJSON().readGeometry(route.geometry);

          const routeFeature = new ol.Feature({
              type: 'route',
              geometry: routeGeometry
          });

          const routeLayer = new ol.layer.Vector({
              source: new ol.source.Vector({
                  features: [routeFeature]
              }),
              style: new ol.style.Style({
                  stroke: new ol.style.Stroke({
                      width: 6,
                      color: [40, 40, 200, 0.8]
                  })
              })
          });

          map.addLayer(routeLayer);
          map.getView().fit(routeGeometry, { padding: [100, 100, 100, 100] });
      } else {
          console.log("Aucun itinéraire trouvé");
      }
  } catch (error) {
      console.error("Erreur de calcul de l'itinéraire:", error);
  }
}
