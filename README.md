Hang-It-Out-
Social Hangout App
A real-time social location-sharing application built with Node.js, Express, Socket.IO, and Leaflet.js. Users can discover hangouts, join forums, share locations, and connect with friends.

Presentation
https://docs.google.com/presentation/d/1Rnf55_smL_iXEY225jInuBr7-oCWYXJtZk-lz0FCV3A/edit?usp=sharing

Members
Chanchal - UI/UX Design Raghav - Backend Ritvik - UI/UX Design and Backend Yash - Backend

Features
✨ User Authentication - Login/Signup with social login options
📍 Real-Time Location Sharing - See all online users on an interactive map
🗺️ Interactive Map - Leaflet.js-powered map with markers for users and hangouts
🎉 Hangout Posts - Create and browse local hangout events
💬 Forums - Auto-generated discussion forums for each hangout
👥 Friend System - Add friends, send requests, share locations
🔔 Real-Time Updates - Socket.IO for live notifications
📱 Responsive Design - Works on desktop and tablet

Authentication
Sign up with email/password or social login (Google/Facebook simulated)
After login, you'll see the main app with map, friends, and hangouts
Map Features
Your location is shown with a blue marker
Other online users appear with different color markers
Hangout events show as red markers
Click any marker for more info
Creating a Hangout
Click the "Create Hangout" button in the right panel
Fill in details: title, location, time, category, description
Submit - a new marker appears on the map and a forum is created
Other users can click on it to join the forum
Forums
Click any hangout marker or card to open its forum
View event details and participants
Send and receive real-time messages
Join or leave the hangout
Friends
View your friends list in the left sidebar
Search for other users
Add/remove friends
Share your location with friends
See friend online status
Technology Stack
Frontend:

HTML5
CSS3
Vanilla JavaScript
Leaflet.js (mapping)
Socket.IO Client (real-time)
Backend:

Node.js
Express.js (web framework)
Socket.IO (WebSocket)
CORS (cross-origin requests)
Body Parser (JSON parsing)
Data Storage:

In-memory (Map objects) - for development
Can be replaced with MongoDB/PostgreSQL for production
Development Notes
Running in Development
npm run dev
This uses Nodemon to auto-restart the server on file changes.

Sample Data
The app comes with sample users and hangouts for testing:

Users: Alex Kumar, Priya Sharma, Sarah Chen, Mike Johnson, Rahul Verma
Hangouts: Coffee meetup, Basketball game, Study session
Support
For issues, questions, or suggestions, please refer to the documentation above or modify the code as needed.
Happy Hanging Out! 🎉
