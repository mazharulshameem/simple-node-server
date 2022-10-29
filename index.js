const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
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

//dbUser1
//NjN0QYmpzMvdLETy

const uri =
  "mongodb+srv://dbUser1:NjN0QYmpzMvdLETy@cluster0.tejyxsb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const userCollection = client.db("simpleNode").collection("users");
    // const user = { name: "Barsha Jalil", email: "barsha@example.com" };
    // const result = await userCollection.insertOne(user);
    // console.log(result);

    app.get("/users", async (req, res) => {
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    app.post("/users", async (req, res) => {
      console.log("Post Api called");
      const user = req.body;
      // user.id = users.length + 1;
      const result = await userCollection.insertOne(user);
      // users.push(user);
      // console.log(user);
      console.log(result);
      user.id = result.insertedId;
      res.send(user);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));

// app.get("/users", (req, res) => {
//   if (req.query.name) {
//     const search = req.query.name;
//     const filtered = users.filter(
//       (usr) => usr.name.toLowerCase().indexOf(search) >= 0
//     );
//     res.send(filtered);
//   } else {
//     res.send(users);
//   }
// });

// app.post("/users", (req, res) => {
//   console.log("Post Api called");
//   const user = req.body;
//   user.id = users.length + 1;
//   users.push(user);
//   console.log(user);
//   res.send(user);
// });
app.listen(port, () => {
  console.log(`Node server listening on port ${port}`);
});
