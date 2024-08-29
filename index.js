// Importing lib
const express = require('express');

// Instantiating the server
const server = express();

// Query params: params that are passed in the route. Example: ?name=NodeJS
// Route params: params that are passed directly in the route. Example: /route/2
// Request Body: { name: "NodeJS", type: "Backend" }

// Creating the first endpoint
// localhost:3000/route
server.get('/firstroute', (req, res) => {
    // Getting data using Query params
    const name = req.query.name;

    return res.json({ route: `Showing name: ${name}` })
})

server.get('/secondroute/:id', (req, res) => {
    // Getting data using Route params
    const id = req.params.id;

    return res.json({ route: `Showing id: ${id}` })
})

server.listen(3000);