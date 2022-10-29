const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Simple node server running");
});
app.use(cors());
app.use(express.json());
const users = [
  { id: 1, name: "John", email: " jhon@gmail.com" },
  { id: 2, name: "Kohn", email: " khon@gmail.com" },
  { id: 3, name: "Lohn", email: " Lhon@gmail.com" },
];
app.get("/users", (req, res) => {
  if (req.query.name) {
    const search = req.query.name;
    const filtered = users.filter(
      (usr) => usr.name.toLowerCase().indexOf(search) >= 0
    );
    res.send(filtered);
  } else {
    res.send(users);
  }
});
app.post("/users", (req, res) => {
  console.log("Post Api called");
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  console.log(user);
  res.send(user);
});
app.listen(port, () => {
  console.log(`Node server listening on port ${port}`);
});
