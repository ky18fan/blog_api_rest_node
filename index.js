const { connection } = require("./database/connection.js");
const express = require("express");
const cors = require("cors");

// Initialize app
console.log("Trying to connect to database my_blog.");

// Connect to database
connection();

// Create node server
const app = express();
const port = 3900;

// Setup cors
app.use(cors());

// Convert body to JS Object
app.use(express.json()); // Receive data with content-type app/json
app.use(express.urlencoded({ extended: true })); // Receive data with form-urlencoded

// Routes
const articleRoutes = require("./routes/article");

// Load routes
app.use("/api", articleRoutes);

app.get("/", (req, res) => {
    return res.status(200).send(
        "<h1>Starting to create an API Rest with NodeJS</h1>"
    );
});

// Create server and listen to http
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});