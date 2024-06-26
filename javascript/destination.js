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

async function showLocation(address) {
  let coords;
  if (address) {
    // console.log("Géocodage de l'adresse: ", address);
    // Géocodage de l'adresse
    coords = await getCoordinatesFromAddress(address);
    // Si aucune coordonnée n'est trouvée pour l'adresse
    if (!coords) {
      // console.log("Aucune coordonnée trouvée pour l'adresse: ", address);
      alert("Adresse non trouvée: " + address);
      return null;
    }
  } else {
    // console.log("Utilisation de la géolocalisation pour l'utilisateur actuel.");
    // console.log("Coordonnées obtenues: ", coords);
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
  displayOnMap(coords); // Envoie les coordonnées directement à la fonction d'affichage sans modification
  return coords;
}

async function showMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // Formatage des coordonnées en tant que tableau de nombres
        const formattedCoords = [parseFloat(longitude), parseFloat(latitude)];
        // Convertir les coordonnées pour OpenLayers
        let olCoords = ol.proj.fromLonLat(formattedCoords);
        // Style de l'icône
        let iconStyle = new ol.style.Style({
          image: new ol.style.Icon({
            src: "images/icon_marqueur.png",
            scale: 0.5,
          }),
        });
        // Créer la fonctionnalité avec l'icône
        let iconFeature = new ol.Feature({
          geometry: new ol.geom.Point(olCoords),
        });
        iconFeature.setStyle(iconStyle);
        // Créer et ajouter la couche vectorielle
        let layer = new ol.layer.Vector({
          source: new ol.source.Vector({
            features: [iconFeature],
          }),
        });
        map.addLayer(layer);
        // Centre la vue sur la position de l'utilisateur
        map.getView().animate({ center: olCoords, zoom: 10 });
      },
      (error) => {
        console.error("Erreur lors de l'obtention de la position : ", error);
      }
    );
  } else {
    console.error(
      "La géolocalisation n'est pas prise en charge par ce navigateur."
    );
  }
}

function displayOnMap(coords) {
  let olCoords = ol.proj.fromLonLat(coords);
  map.getView().animate({ center: olCoords, zoom: 16 });
  let iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
      src: "images/icon_marqueur.png",
      scale: 0.5,
    }),
  });
  let iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(olCoords),
  });
  iconFeature.setStyle(iconStyle);
  let layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [iconFeature],
    }),
  });
  map.addLayer(layer);
}

// Variables globales pour stocker les coordonnées
let startPoint = null;
let endPoint = null;

async function setStartPoint() {
  const address = document.getElementById("startAddress").value;
  //   console.log("Définition du point de départ pour l'adresse: ", address);
  if (address) {
    // Si une adresse est fournie, utilisez showLocation pour cette adresse
    // console.log("Utilisation de showLocation pour l'adresse: ", address);
    await showLocation(address);
  } else {
    // Si aucune adresse n'est fournie, utilisez showMyLocation pour obtenir la position actuelle
    // console.log("Utilisation de showMyLocation pour obtenir la position actuelle");
    await showMyLocation();
  }
  const coords = await showLocation(address);
  //   console.log("Coordonnées du point de départ: ", coords);
  startPoint = coords;
  return coords;
}

async function setEndPoint() {
  const address = document.getElementById("endAddress").value;
  //   console.log("Définition du point d'arrivée pour l'adresse: ", address);
  const coords = await showLocation(address);
  //   console.log("Coordonnées du point d'arrivée: ", coords);
  endPoint = coords;
  return coords;
}

async function handleRouteCalculation() {
  console.log("Calcul de l'itinéraire en cours...");
  try {
    const startCoords = await setStartPoint();
    const endCoords = await setEndPoint();
    // Assure que startCoords et endCoords sont des tableaux
    startPoint = Array.isArray(startCoords) ? startCoords : null;
    endPoint = Array.isArray(endCoords) ? endCoords : null;
    if (!startPoint || !endPoint) {
      alert(
        "Veuillez spécifier à la fois un point de départ et un point d'arrivée."
      );
      return;
    }
    // console.log("Is startPoint an array?", Array.isArray(startPoint));
    // console.log("Is endPoint an array?", Array.isArray(endPoint));
    calculateAndDisplayRoute(startPoint, endPoint);
  } catch (error) {
    console.error("Erreur lors du calcul de l'itinéraire:", error);
  }
}

async function getCoordinatesFromAddress(address) {
  const apiKey = "5b3ce3597851110001cf6248265456eaefdf40ca9d7ce5ce7a189570";
  try {
    const response = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(
        address
      )}`
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

async function calculateAndDisplayRoute(startPoint, endPoint) {
  // console.log("Start Point:", startPoint);
  // console.log("End Point:", endPoint);
  if (
    !Array.isArray(startPoint) ||
    !Array.isArray(endPoint) ||
    startPoint.length !== 2 ||
    endPoint.length !== 2
  ) {
    alert(
      "Veuillez spécifier à la fois un point de départ et un point d'arrivée."
    );
    return;
  }
  const apiKey = "5b3ce3597851110001cf6248265456eaefdf40ca9d7ce5ce7a189570";
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startPoint.join(
    ","
  )}&end=${endPoint.join(",")}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept:
          "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // console.log("Response from API:", data);
    if (data.features && data.features.length > 0) {
      const route = data.features[0];
      // Lire et transformer directement la géométrie
      const routeGeometry = new ol.format.GeoJSON().readGeometry(
        route.geometry,
        {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857",
        }
      );
      // console.log("Route Geometry:", routeGeometry);
      const routeFeature = new ol.Feature({
        type: "route",
        geometry: routeGeometry,
      });
      const routeLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: [routeFeature],
        }),
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({
            width: 6,
            color: [40, 40, 200, 0.8],
          }),
        }),
      });
      map.addLayer(routeLayer);
      map.getView().fit(routeGeometry, {
        padding: [100, 100, 100, 100],
        zoom: 10,
      });
    } else {
      console.log("Aucun itinéraire trouvé");
    }
  } catch (error) {
    console.error("Erreur lors de la requête à l'API:", error);
  }
}