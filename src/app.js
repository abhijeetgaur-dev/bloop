const express = require("express");
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// Sample user data
let users = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
    { id: 3, name: "Doe", age: 40 }
];

// GET all users
app.get("/users", (req, res) => {
    res.json(users);
});

// GET a single user by ID
app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("User not found");
    res.json(user);
});

// POST (add a new user)
app.post("/users", (req, res) => {
    const newUser = {
        id: users.length + 1, // Generate a simple ID
        name: req.body.name,
        age: req.body.age
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT (update a user by ID)
app.put("/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("User not found");

    user.name = req.body.name || user.name;
    user.age = req.body.age || user.age;

    res.json(user);
});

// DELETE a user by ID
app.delete("/users/:id", (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send("User not found");

    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser);
});

// Default route
app.use("/", (req, res) => {
    res.send("Hello World");
});

// Start server
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
