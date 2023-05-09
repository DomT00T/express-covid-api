const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is runing...')
})


const uri = "mongodb://myUserAdmin:myUserAdmin@127.0.0.1:27017";

// Create a MongoClient instance and connect to the database
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect();

app.post('/users/create', async (req, res) => {
  try {
    const { id, fname, lname, idcard, email, age, tel, address } = req.body;
    const result = await client.db("db-covid").collection("users").insertOne({
      id: parseInt(id),
      fname,
      lname,
      idcard,
      email,
      age,
      tel,
      address
    });

    res.status(200).send({
      "status": "ok",
      "message": `User with ID ${id} is created`,
      "user": req.body
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      "status": "error",
      "message": "Failed to create user"
    });
  }
});


app.get('/users', async (req, res) => {
  try {
    const users = await client.db("db-covid").collection("users").find({}, { _id: 0, id: 1, fname: 1, lname: 1 }).toArray();
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      "status": "error",
      "message": "Failed to retrieve users"
    });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { _id, ...user } = await client.db("db-covid").collection("users").findOne({ "id": id });
    res.status(200).send({
      "status": "ok",
      "user": user
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      "status": "error",
      "message": "Failed to retrieve user"
    });
  }
});


app.put('/users/update', async (req, res) => {
  try {
    const user = req.body;
    const id = user.id;
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const result = await client.db("db-covid").collection("users").updateOne({ "id": id }, { "$set": { ...user } }, { upsert: true });
    await client.close();
    res.status(200).send({
      "status": "ok",
      "message": `User with ID = ${id} ${result.modifiedCount > 0 ? 'is updated' : 'is created'}`,
      "user": user
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      "status": "error",
      "message": "Failed to update user"
    });
  }
});

app.delete('/users/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    await client.db("db-covid").collection("users").deleteOne({ "id": id });
    await client.close();
    res.status(200).send({
      "status": "ok",
      "message": `User with ID = ${id} is deleted`
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      "status": "error",
      "message": "Failed to delete user"
    });
  }
});

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`)
})
