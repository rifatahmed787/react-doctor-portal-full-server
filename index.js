const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bathfkv.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const appointmentCollection = client
      .db("doctorPortal")
      .collection("appointmentData");
    const bookingsCollection = client
      .db("doctorPortal")
      .collection("bookingsData");

    //get method for get appointments
    app.get("/appointments", async (req, res) => {
      const query = {};
      const cursor = appointmentCollection.find(query);
      const option = await cursor.toArray();
      res.send(option);
    });

    //post method for booking
    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      const result = await bookingsCollection.insertOne(booking);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.error());

app.get("/", async (req, res) => {
  res.send("doctor portal is running on port");
});

app.listen(port, () => {
  console.log(`doctor portal running : ${port}`);
});
