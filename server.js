const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (replace with real database in production)
const database = {
    users: [],
    places: [
        {
            id: 'cafe1',
            name: 'The Coffee Haven',
            type: 'Cafe',
            location: '123 Main Street',
            timings: '8:00 AM - 10:00 PM',
            fee: 'Free Entry',
            rating: 4.5,
            hangouts: []
        },
        {
            id: 'park1',
            name: 'Central Park',
            type: 'Park',
            location: '456 Park Avenue',
            timings: '6:00 AM - 8:00 PM',
            fee: 'Free',
            rating: 4.8,
            hangouts: []
        },
        {
            id: 'cafe2',
            name: 'Brew & Chill',
            type: 'Cafe',
            location: '789 Oak Street',
            timings: '9:00 AM - 11:00 PM',
            fee: 'Free Entry',
            rating: 4.3,
            hangouts: []
        },
        {
            id: 'fun1',
            name: 'Game Arena',
            type: 'Fun Spot',
            location: '321 Entertainment Blvd',
            timings: '12:00 PM - 12:00 AM',
            fee: '$10 per person',
            rating: 4.6,
            hangouts: []
        }
    ],
    chats: [],
    messages: []
};

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token.' });
    }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date() });
});

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = database.users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = {
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
            createdAt: new Date()
        };

        database.users.push(user);

        res.status(201).json({ 
            message: 'User created successfully',
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
});

app.post('/api/auth/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user
        const user = database.users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Signed in successfully',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ message: 'Server error during signin' });
    }
});

// Places Routes
app.get('/api/places', (req, res) => {
    res.json({ places: database.places });
});

app.get('/api/places/:id', (req, res) => {
    const place = database.places.find(p => p.id === req.params.id);
    if (!place) {
        return res.status(404).json({ message: 'Place not found' });
    }
    res.json({ place });
});

app.put('/api/places/:id/rating', authenticateToken, (req, res) => {
    const { rating } = req.body;
    const place = database.places.find(p => p.id === req.params.id);
    
    if (!place) {
        return res.status(404).json({ message: 'Place not found' });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Simple rating calculation (in production, store all ratings)
    place.rating = ((place.rating + rating) / 2).toFixed(1);
    
    res.json({ message: 'Rating updated', place });
});

// Hangout Routes
app.post('/api/hangouts', authenticateToken, (req, res) => {
    try {
        const { placeId, title, maxPeople, time, description } = req.body;

        const place = database.places.find(p => p.id === placeId);
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }

        const hangout = {
            id: Date.now().toString(),
            title,
            maxPeople: parseInt(maxPeople),
            participants: 1,
            time,
            description,
            creator: req.user.id,
            createdAt: new Date()
        };

        place.hangouts.push(hangout);

        res.status(201).json({ 
            message: 'Hangout created successfully',
            hangout 
        });
    } catch (error) {
        console.error('Create hangout error:', error);
        res.status(500).json({ message: 'Server error creating hangout' });
    }
});

app.post('/api/hangouts/:hangoutId/join', authenticateToken, (req, res) => {
    try {
        const { hangoutId } = req.params;
        let hangout = null;
        let place = null;

        // Find the hangout in places
        for (const p of database.places) {
            const h = p.hangouts.find(h => h.id === hangoutId);
            if (h) {
                hangout = h;
                place = p;
                break;
            }
        }

        if (!hangout) {
            return res.status(404).json({ message: 'Hangout not found' });
        }

        if (hangout.participants >= hangout.maxPeople) {
            return res.status(400).json({ message: 'Hangout is full' });
        }

        hangout.participants++;

        res.json({ 
            message: 'Joined hangout successfully',
            hangout 
        });
    } catch (error) {
        console.error('Join hangout error:', error);
        res.status(500).json({ message: 'Server error joining hangout' });
    }
});

app.get('/api/hangouts', authenticateToken, (req, res) => {
    const allHangouts = [];
    
    database.places.forEach(place => {
        place.hangouts.forEach(hangout => {
            allHangouts.push({
                ...hangout,
                placeName: place.name,
                placeId: place.id
            });
        });
    });

    res.json({ hangouts: allHangouts });
});

// Chat Routes
app.get('/api/chats', authenticateToken, (req, res) => {
    const userChats = database.chats.filter(
        chat => chat.participants.includes(req.user.id)
    );
    res.json({ chats: userChats });
});

app.post('/api/chats', authenticateToken, (req, res) => {
    try {
        const { name, type, participants } = req.body;

        const chat = {
            id: Date.now().toString(),
            name,
            type, // 'user', 'group', 'community', 'forum'
            participants: [req.user.id, ...participants],
            createdAt: new Date()
        };

        database.chats.push(chat);

        res.status(201).json({ 
            message: 'Chat created successfully',
            chat 
        });
    } catch (error) {
        console.error('Create chat error:', error);
        res.status(500).json({ message: 'Server error creating chat' });
    }
});

// Message Routes
app.get('/api/messages/:chatId', authenticateToken, (req, res) => {
    const messages = database.messages.filter(
        msg => msg.chatId === req.params.chatId
    );
    res.json({ messages });
});

app.post('/api/messages', authenticateToken, (req, res) => {
    try {
        const { chatId, message } = req.body;

        const chat = database.chats.find(c => c.id === chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        if (!chat.participants.includes(req.user.id)) {
            return res.status(403).json({ message: 'Not a member of this chat' });
        }

        const newMessage = {
            id: Date.now().toString(),
            chatId,
            userId: req.user.id,
            message,
            createdAt: new Date()
        };

        database.messages.push(newMessage);

        res.status(201).json({ 
            message: 'Message sent successfully',
            data: newMessage 
        });
    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).json({ message: 'Server error sending message' });
    }
});

// Search Routes
app.get('/api/search', authenticateToken, (req, res) => {
    const { query, type } = req.query;
    
    let results = [];

    if (!type || type === 'places') {
        const places = database.places.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.location.toLowerCase().includes(query.toLowerCase())
        );
        results.push(...places.map(p => ({ ...p, resultType: 'place' })));
    }

    if (!type || type === 'users') {
        const users = database.users.filter(u => 
            u.name.toLowerCase().includes(query.toLowerCase()) ||
            u.email.toLowerCase().includes(query.toLowerCase())
        ).map(u => ({ id: u.id, name: u.name, email: u.email, resultType: 'user' }));
        results.push(...users);
    }

    res.json({ results });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📍 API endpoints available at http://localhost:${PORT}/api`);
    console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});