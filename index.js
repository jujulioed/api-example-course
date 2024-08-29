// Importing lib
const express = require('express');

// Instantiating the server
const server = express();

// Creating the first endpoint
// localhost:3000/route
server.get('/route', (req, res) => {
    return res.json({ route: "NodeJS route" })
})

server.listen(3000);