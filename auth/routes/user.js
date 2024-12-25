const express = require("express");
const router = express.Router();

// Import the controller functions
const { login, signup, getAllStudents, getUserDetails } = require("../controllers/Auth");

// Define the routes
router.post("/login", login);
router.post("/signup", signup);
router.get("/students", getAllStudents);
router.get('/users/:email', getUserDetails);

// Export the router
module.exports = router;
