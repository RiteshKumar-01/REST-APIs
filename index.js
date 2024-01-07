const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const PORT = 8000;
const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to REST API basics!");
});

app.get("/users", (req, res) => {
  const html = `
      <ul>
          ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
      </ul>
      `;
  res.send(html);
});

//REST API
app.get("/api/users", (req, res) => {
  return res.json(users);
});

//Dynamic route
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //edit user with id
    return res.json({ msg: "status pending" });
  })
  .delete((req, res) => {
    //delete user with id
    return res.json({ msg: "status pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ msg: "status success", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server runs on PORT: ${PORT}`);
});
