// Import Express framework for building web server and handling HTTP requests
const express = require("express");

// Import Mongoose library for MongoDB object modelling and database operations
const mongoose = require("mongoose");

// Import body-parser middleware to parse incoming JSON request bodies
const bodyParser = require("body-parser");

// Create an Express application instance
const app = express();

// Use body-parser middleware to automatically parse JSON in request bodies
app.use(bodyParser.json());

// Define the port number where the server will listen for requests
const port = 3000;

// Define the Todo model schema with Mongoose
// This creates a MongoDB collection structure with two fields: title and is_completed
const Todo = mongoose.model("Todo", {
  title: String,
  is_completed: Boolean,
});

// GET endpoint: Retrieve all todos from the database
// Route: GET /
app.get("/", async (_, res) => {
  // Query the database to find all todo documents
  const todos = await Todo.find();
  // Send the array of todos as JSON response
  return res.json(todos);
});

// GET endpoint: Retrieve a single todo by its ID
// Route: GET /:todo_id
app.get("/:todo_id", async (req, res) => {
  // Find a todo document by its MongoDB _id from the URL parameter
  const todo = await Todo.findById(req.params.todo_id);
  // Send the found todo as JSON response
  return res.json(todo);
});

// POST endpoint: Create a new todo item
// Route: POST /
app.post("/", async (req, res) => {
  // Extract title and is_completed fields from the request body
  const body_data = {
    title: req.body.title,
    is_completed: req.body.is_completed,
  };
  // Create a new todo document in the database with the provided data
  const todo = await Todo.create(body_data);
  // Send the newly created todo as JSON response
  return res.json(todo);
});

// PATCH endpoint: Update an existing todo by its ID
// Route: PATCH /:todo_id
app.patch("/:todo_id", async (req, res) => {
  // Extract updated title and is_completed fields from the request body
  const body_data = {
    title: req.body.title,
    is_completed: req.body.is_completed,
  };
  // Find the todo by ID and update it with new data
  // The { new: true } option returns the updated document instead of the original
  const todo = await Todo.findByIdAndUpdate(req.params.todo_id, body_data, {
    new: true,
  });
  // Send the updated todo as JSON response
  return res.json(todo);
});

// DELETE endpoint: Remove a todo by its ID
// Route: DELETE /:todo_id
app.delete("/:todo_id", async (req, res) => {
  // Find the todo by ID and delete it from the database
  const todo = await Todo.findByIdAndDelete(req.params.todo_id);
  // Send the deleted todo as JSON response
  return res.json(todo);
});

// Connect to MongoDB database and start the Express server
// Connection string points to a local MongoDB instance with database name "todo_db"
mongoose.connect("mongodb://localhost:27017/todo_db").then(() => {
  // Log success message when database connection is established
  console.log("Database connected");
  // Start the Express server listening on the specified port
  app.listen(port, () => {
    // Log message confirming server is running and on which port
    console.log(`Example app listening on port ${port}`);
  });
});
