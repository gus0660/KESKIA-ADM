
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

      if (data.features && data.features.length > 0) {
          // Prend la première fonctionnalité de la réponse
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
      // Géocodage de l'adresse
      coords = await getCoordinatesFromAddress(address);
  } else {
      // Utiliser la géolocalisation
      try {
          const position = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          coords = [position.coords.longitude, position.coords.latitude];
      } catch (error) {
          alert("Erreur de géolocalisation: " + error.message);
          return;
      }
  }

  if (coords) {
      displayOnMap(coords);
      return coords; // Ajouter cette ligne pour retourner les coordonnées
  } else {
      alert("Adresse non trouvée ou géolocalisation non disponible.");
  }
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

function showMyLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var coords = [position.coords.longitude, position.coords.latitude];
      var olCoords = ol.proj.fromLonLat(coords);
      map.getView().animate({ center: olCoords, zoom: 14 });

      var iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
          src: "images/icon_marqueur.png",
          scale: 0.5
        }),
      });
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
    });
  }
}
// Variables globales pour stocker les coordonnées
let startPoint = null;
let endPoint = null;

// Fonction pour mettre à jour le point de départ
// function setStartPoint() {
//     const address = document.getElementById('startAddress').value;
//     showLocation(address, (coords) => {
//         startPoint = coords;
//     });
// }

// Fonction pour mettre à jour le point d'arrivée
// function setEndPoint() {
//     const address = document.getElementById('endAddress').value;
//     showLocation(address, (coords) => {
//         endPoint = coords;
//     });
// }

async function setStartPoint() {
  const address = document.getElementById('startAddress').value;
  const coords = await showLocation(address);
  startPoint = coords;
  return coords;
}

async function setEndPoint() {
  const address = document.getElementById('endAddress').value;
  const coords = await showLocation(address);
  endPoint = coords;
  return coords;
}


function handleRouteCalculation() {
  Promise.all([setStartPoint(), setEndPoint()])
      .then((values) => {
          const [startPoint, endPoint] = values;
          calculateAndDisplayRoute(startPoint, endPoint);
      })
      .catch(error => {
          console.error("Erreur lors de la définition des points de départ/arrivée", error);
      });
}


async function calculateAndDisplayRoute(startPoint, endPoint) {
  console.log("startPoint:", startPoint, "endPoint:", endPoint);
  if (!startPoint || !endPoint) {
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
// Votre fonction calculateAndDisplayRoute semble bien structurée pour traiter les coordonnées une fois qu'elles sont passées en argument. Cependant, pour intégrer cette fonction de manière fluide avec les modifications proposées précédemment, vous pouvez faire quelques ajustements mineurs :

// Retirer le mot-clé async si non nécessaire : Si votre fonction n'utilise pas await en dehors du fetch, vous pouvez retirer le mot-clé async. Dans votre cas actuel, await est utilisé correctement, donc vous pouvez le conserver.

// Passage des coordonnées en argument : Assurez-vous que les coordonnées sont correctement passées à calculateAndDisplayRoute depuis handleRouteCalculation. Comme vous avez modifié setStartPoint et setEndPoint pour retourner des promesses, startPoint et endPoint seront définis correctement avant l'appel de calculateAndDisplayRoute.

// Vérification des erreurs : Vous avez déjà inclus un bloc try...catch pour gérer les erreurs potentielles lors de l'appel à l'API. C'est une bonne pratique.

// En résumé, votre fonction calculateAndDisplayRoute est bien configurée pour être utilisée avec les modifications suggérées pour setStartPoint, setEndPoint, et handleRouteCalculation. Assurez-vous juste que les coordonnées sont correctement passées et que toutes les fonctions interagissent correctement.

// Voici comment devrait se présenter la séquence d'appels :

// L'utilisateur entre les adresses de départ et d'arrivée.
// L'utilisateur clique sur le bouton pour calculer l'itinéraire.
// handleRouteCalculation est appelé.
// handleRouteCalculation attend que setStartPoint et setEndPoint aient fini (en utilisant Promise.all).
// Une fois que les coordonnées sont prêtes, calculateAndDisplayRoute est appelé avec ces coordonnées.
// calculateAndDisplayRoute procède au calcul et à l'affichage de l'itinéraire.