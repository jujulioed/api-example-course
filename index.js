// Importing lib
const express = require('express');

// Instantiating the server
const server = express();

// Sets the application to be prepared to receive json from request body
server.use(express.json());

const courses = ['Node JS', 'JavaScript', 'React Native'];
// Creating a globla middleware
server.use((req, res, next) => {
    // It prints the url requested and the type of the request
    console.log(`Requested URL: ${req.url}\nHTTP request method: ${req.method}`);

    // This `next` function is responsible for, after this global middleware ran, continue to the requested route
    return next();
});

// Let's create another middleware(function) to validate the data `name` that comes in a request body
function checkCourse(req, res, next) {
    if(!req.body.name) {
        return res.status(400).json({ error: "The course name is mandatory" });
    }

    return next();
}

// Let's create another middleware to validade the index when it's requested to return a especific course name
function checkIndexAvailability(req, res, next) {
    const course = courses[req.params.index];
    if(!course) {
        return res.status(400).json({ error: "This index doesn't exist in `courses` list" });
    }

    req.course = course;

    return next();
}


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

server.get('/courses/:index', checkIndexAvailability, (req, res) => {
    // This `req.course` comes from `checkIndexAvailability` that sets this data
    return res.json(req.course);
});

// Lets create a CRUD!
// Create, Read, Update, Delete

// Create a new course
server.post('/courses', checkCourse, (req, res) => {
    const { name } = req.body;
    courses.push(name);

    return res.json(courses);
});

// Read all the courses
server.get('/courses', (req, res) => {
    return res.json(courses);
});

// Update a course
server.put('/courses/:index', checkCourse, checkIndexAvailability, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    courses[index] = name;

    return res.json(courses);
});

// Delete a course
server.delete('/courses/:index', checkIndexAvailability, (req, res) => {
    const { index } = req.params;

    courses.splice(index, 1);

    return res.json(courses);
});

server.listen(3000);