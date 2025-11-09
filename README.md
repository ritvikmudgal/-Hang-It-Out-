# Hang-It-Out-
# Social Hangout App

A real-time social location-sharing application built with Node.js, Express, Socket.IO, and Leaflet.js. Users can discover hangouts, join forums, share locations, and connect with friends.

# Presentation
https://docs.google.com/presentation/d/1Rnf55_smL_iXEY225jInuBr7-oCWYXJtZk-lz0FCV3A/edit?usp=sharing

# Members
Chanchal - UI/UX Design
Raghav - Backend
Ritvik - UI/UX Design and Backend 
Yash - Backend

## Features

✨ **User Authentication** - Login/Signup with social login options <br>
📍 **Real-Time Location Sharing** - See all online users on an interactive map <br>
🗺️ **Interactive Map** - Leaflet.js-powered map with markers for users and hangouts <br>
🎉 **Hangout Posts** - Create and browse local hangout events <br>
💬 **Forums** - Auto-generated discussion forums for each hangout <br>
👥 **Friend System** - Add friends, send requests, share locations <br>
🔔 **Real-Time Updates** - Socket.IO for live notifications <br>
📱 **Responsive Design** - Works on desktop and tablet
## Theme 
Open-Innovation 

## Competetor
`Meetup` 

### Authentication
- Sign up with email/password or social login (Google/Facebook simulated)
- After login, you'll see the main app with map, friends, and hangouts

### Map Features
- Your location is shown with a blue marker
- Other online users appear with different color markers
- Hangout events show as red markers
- Click any marker for more info

### Creating a Hangout
1. Click the **"Create Hangout"** button in the right panel
2. Fill in details: title, location, time, category, description
3. Submit - a new marker appears on the map and a forum is created
4. Other users can click on it to join the forum

### Forums
- Click any hangout marker or card to open its forum
- View event details and participants
- Send and receive real-time messages
- Join or leave the hangout

### Friends
- View your friends list in the left sidebar
- Search for other users
- Add/remove friends
- Share your location with friends
- See friend online status

<!-- ## API Endpoints -->
<!-- 
### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/signup` - Register new user

### Hangouts
- `GET /api/hangouts` - Get all hangouts
- `POST /api/hangouts` - Create new hangout
- `GET /api/hangouts/:id` - Get specific hangout
- `POST /api/hangouts/:id/join` - Join hangout
- `POST /api/hangouts/:id/leave` - Leave hangout

### Forums
- `GET /api/forums/:forumId/messages` - Get forum messages
- `POST /api/forums/:forumId/messages` - Send message

### Users
- `GET /api/users/:userId/friends` - Get user's friends
- `POST /api/users/:userId/friends/:friendId` - Add friend
- `DELETE /api/users/:userId/friends/:friendId` - Remove friend
- `GET /api/users/:userId` - Get user profile

## Socket.IO Events

### Client → Server
- `user_online` - User comes online with location
- `user_position_update` - Update user position
- `hangout_created` - Broadcast new hangout
- `send_message` - Send forum message
- `user_joined_forum` - User joins forum

### Server → Client
- `users_update` - All online users list
- `new_hangout` - New hangout created
- `hangout_update` - Hangout details updated
- `new_message` - New forum message
- `user_joined_forum` - User joined forum -->

## Technology Stack

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript
- Leaflet.js (mapping)
- Socket.IO Client (real-time)

**Backend:**
- Node.js
- Express.js (web framework)
- Socket.IO (WebSocket)
- CORS (cross-origin requests)
- Body Parser (JSON parsing)

**Data Storage:**
- In-memory (Map objects) - for development
- Can be replaced with MongoDB/PostgreSQL for production

## Development Notes

### Running in Development
```bash
npm run dev
```
This uses Nodemon to auto-restart the server on file changes.

### Sample Data
The app comes with sample users and hangouts for testing:
- Users: Alex Kumar, Priya Sharma, Sarah Chen, Mike Johnson, Rahul Verma
- Hangouts: Coffee meetup, Basketball game, Study session

## Support

For issues, questions, or suggestions, please refer to the documentation above or modify the code as needed.
---

**Happy Hanging Out! 🎉**
