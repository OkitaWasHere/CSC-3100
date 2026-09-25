// backend.js
import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Whoaaaaaa!");
});

// Get all users, or search by name and/or job
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userService
    .getUsers(name, job)
    .then((users) => {
      res.send({ users_list: users });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Unable to retrieve users.");
    });
});

// Get one user by MongoDB _id
app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  userService
    .findUserById(id)
    .then((user) => {
      if (user === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Unable to retrieve user.");
    });
});

// Create a user in MongoDB
app.post("/users", (req, res) => {
  userService
    .addUser(req.body)
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Unable to create user.");
    });
});

// Delete a user from MongoDB by _id
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  userService
    .removeUser(id)
    .then((deletedUser) => {
      if (deletedUser === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Unable to delete user.");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});