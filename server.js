const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.get('/geocode', async (req, res) => {
    const address = req.query.address;
    const url = `https://api.openrouteservice.org/geocode/search?api_key=${process.env.API_KEY}&text=${encodeURIComponent(address)}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.send(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  app.get('/route', async (req, res) => {
    const { start, end } = req.query;
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.API_KEY}&start=${start}&end=${end}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.send(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  