const { Client } = require("cassandra-driver");
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express().use(bodyParser.json());

app.get("/", async (req, res) => {
  const { sql } = req.body;

  const client = new Client({
    cloud: {
      secureConnectBundle: "./secure-connect-privator.zip",
    },
    credentials: {
      username: process.env.CLIENT_ID,
      password: process.env.SECRET,
    },
  });

  await client.connect();

  // Execute a query
  const rs = await client.execute(sql ? sql : "SELECT * FROM privator.users;");
  res.send(rs.rows);

  await client.shutdown();
});

app.listen(3000, () => console.log("running"));

// async function run() {
//   const client = new Client({
//     cloud: {
//       secureConnectBundle: "./secure-connect-privator.zip",
//     },
//     credentials: {
//       username: process.env.CLIENT_ID,
//       password: process.env.SECRET,
//     },
//   });

//   await client.connect();

//   // Execute a query
//   const rs = await client.execute("SELECT * FROM privator.users");
//   console.log(`Your cluster returned ${rs.rows} row(s)`);

//   await client.shutdown();
// }

// // Run the async function
// run();
