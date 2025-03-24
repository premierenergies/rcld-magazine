const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' folder

// MongoDB Connection
const uri = 'YOUR_MONGODB_ATLAS_CONNECTION_STRING';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Schema and Model
const userSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String
});
const User = mongoose.model('test', userSchema);

// API Routes
app.post('/submit', async (req, res) => {
    try {
        const { name, number, email } = req.body;
        const newUser = new User({ name, number, email });
        await newUser.save();
        res.status(201).send('Entry saved successfully!');
    } catch (error) {
        res.status(500).send('Error saving entry: ' + error.message);
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));