// Importing lib
const express = require('express');

// Instantiating the server
const server = express();

// Sets the application to be prepared to receive json from request body
server.use(express.json());

const courses = ['Node JS', 'JavaScript', 'React Native'];

// Query params: params that are passed in the route. Example: ?name=NodeJS
// Route params: params that are passed directly in the route. Example: /route/2
// Request Body: { name: "NodeJS", type: "Backend" }

// Creating the first endpoint
// localhost:3000/route
server.get('/firstroute', (req, res) => {
    // Getting data using Query params
    const name = req.query.name;

    return res.json({ route: `Showing name: ${name}` })
});

server.get('/secondroute/:id', (req, res) => {
    // Getting data using Route params
    const id = req.params.id;

    return res.json({ route: `Showing id: ${id}` })
});

server.get('/courses/:index', (req, res) => {
    // Getting data using Route params
    const { index } = req.params;
    return res.json(courses[index]);
});

// Lets create a CRUD!
// Create, Read, Update, Delete

// Create
server.post('/courses', (req, res) => {
    const { name } = req.body;
    courses.push(name);

    return res.json(courses);
});

// Read
server.get('/courses', (req, res) => {
    return res.json(courses);
});

// Update
server.put('/courses/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    courses[index] = name;

    return res.json(courses);
});

// Delete
server.delete('/courses/:index', (req, res) => {
    const { index } = req.params;

    courses.splice(index, 1);

    return res.json(courses);
});

server.listen(3000);