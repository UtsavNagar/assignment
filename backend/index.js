require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const admin = require('firebase-admin');
const bodyParser = require('body-parser');


// Middleware to parse JSON requests
app.use(express.json());

const serviceAccount = require('./firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Middleware
app.use(bodyParser.json());

// Login Route (Token Verification)
app.post('/login', async (req, res) => {
    const { token } = req.body;

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        res.json({
            message: 'User authenticated successfully',
            uid: decodedToken.uid,
            email: decodedToken.email
        });
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
});

// Test Route
app.get('/', (req, res) => {
    res.send('Firebase Express API Running');
});



// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
