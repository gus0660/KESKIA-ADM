


let map;

// api OpenLayers
document.addEventListener("DOMContentLoaded", function () {
    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([5.604490, 43.174360]),
        zoom: 14
      })
    });
  });
  
  
  
  function geocodeAddress(address) {
    var apiKey = '5b3ce3597851110001cf6248265456eaefdf40ca9d7ce5ce7a189570';
    fetch(`https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}`)
      .then(response => response.json())
      .then(data => {
        // Traitez les données de géocodage ici
      })
      .catch(error => console.log(error));
  }
  
  function calculateRoute(startCoords, endCoords) {
    var apiKey = '5b3ce3597851110001cf6248265456eaefdf40ca9d7ce5ce7a189570';
    var requestBody = {
      coordinates: [startCoords, endCoords],
      profile: 'driving-car',
      format: 'json'
    };
  
    fetch('https://api.openrouteservice.org/v2/directions/driving-car', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => response.json())
      .then(data => {
        // Affichez l'itinéraire sur la carte ici
      })
      .catch(error => console.log(error));
  }
  
  document.getElementById('bouton_geoloc').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lon = position.coords.longitude;
            var lat = position.coords.latitude;
  
            // Créer une icône
            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
            });
  
            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon({
                    // Spécifiez le chemin de votre icône ici
                    src: 'images/icon_marqueur.png'
                })
            });
  
            iconFeature.setStyle(iconStyle);
  
            var vectorSource = new ol.source.Vector({
                features: [iconFeature]
            });
  
            var vectorLayer = new ol.layer.Vector({
                source: vectorSource
            });
  
            // Ajouter l'icône à la carte
            map.addLayer(vectorLayer);
  
            // Centrer la carte sur la position
            map.getView().setCenter(ol.proj.fromLonLat([lon, lat]));
            map.getView().setZoom(12); // Ajustez le niveau de zoom si nécessaire
        }, function(error) {
            // Gérer les erreurs ici
            console.log('Erreur de géolocalisation: ' + error.message);
        });
    } else {
        alert("La géolocalisation n'est pas prise en charge par ce navigateur.");
    }
  });