const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = '<YOUR_CONNECTION_STRING>';  // Replace with your connection string

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define Schema and Model
const testSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String,
    address: String
});

const Test = mongoose.model('Test', testSchema);

// Insert demo entries
const demoEntries = [
    { name: 'John Doe', number: '1234567890', email: 'johndoe@example.com', address: '123 Main St' },
    { name: 'Jane Doe', number: '0987654321', email: 'janedoe@example.com', address: '456 Maple Ave' }
];

async function insertDemoEntries() {
    try {
        await Test.insertMany(demoEntries);
        console.log('Demo entries inserted successfully');
    } catch (err) {
        console.error('Error inserting demo entries:', err);
    }
}

// Endpoint to get all entries
app.get('/entries', async (req, res) => {
    try {
        const entries = await Test.find();
        res.json(entries);
    } catch (err) {
        res.status(500).send('Error fetching entries');
    }
});

// Start the server
app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`);
    await insertDemoEntries();
});
