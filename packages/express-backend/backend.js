// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Whoaaaaaa!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

// list of user ids
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
}

// returns the entire list of users
const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

// old get
// app.get("/users", (req, res) => {
//   const name = req.query.name;
//   if (name != undefined) {
//     let result = findUserByName(name);
//     result = { users_list: result };
//     res.send(result);
//   } else {
//     res.send(users);
//   }
// })


// finding users
// ex. localhost:8000/users/?name=Mac
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
})


// adding users
// boomerang post request to add cindy user
// check with another boomerang get request to see if cindy is a new user
const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
})

// delete users
const deleteUserById = (id) => {
  const index = users["users_list"].findIndex(
    (user) => user["id"] === id
  );

  if (index === -1) {
    return undefined;
  }

  return users["users_list"].splice(index, 1)[0];
}

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const deletedUser = deleteUserById(id);

  if (deletedUser === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(deletedUser);
  }
})


// search users by both name and job
const findUsersByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
}

// updated get
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name !== undefined && job !== undefined) {
    const result = findUsersByNameAndJob(name, job);
    res.send({ users_list: result });
  } else if (name !== undefined) {
    const result = findUserByName(name);
    res.send({ users_list: result });
  } else {
    res.send(users);
  }
});
