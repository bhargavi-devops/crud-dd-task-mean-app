const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://admin:password@mongo:27017/ddtask?authSource=admin';

let dbClient;
let db;

async function start() {
  dbClient = new MongoClient(mongoUrl);
  await dbClient.connect();
  db = dbClient.db(); // default db from URL
  console.log('Connected to MongoDB');

  // Example collection endpoint
  app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

  // Basic CRUD example: collection "items"
  app.get('/api/items', async (req, res) => {
    const items = await db.collection('items').find().toArray();
    res.json(items);
  });

  app.post('/api/items', async (req, res) => {
    const doc = req.body;
    const result = await db.collection('items').insertOne(doc);
    res.json({ insertedId: result.insertedId });
  });

  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
}

start().catch(err => {
  console.error('Failed to start app', err);
  process.exit(1);
});
