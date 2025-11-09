
// API Base URL
const API_URL = 'http://localhost:3000/api';
const SOCKET_URL = 'http://localhost:3000';

// Socket.IO connection
let socket = null;
let currentUser = {
    name: 'User_' + Math.floor(Math.random() * 1000),
    id: null
};

// Current theme and chat
let currentTheme = 'dark';
let currentChat = null;
let typingTimeout = null;

// Sample data for places
let places = {};

// Open modal
document.getElementById('profileBtn').onclick = function() {
  document.getElementById('profileModal').classList.add('show');
};
// Close modal
document.getElementById('closeProfile').onclick = function() {
  document.getElementById('profileModal').classList.remove('show');
};
// Close modal when clicking outside content
document.getElementById('profileModal').onclick = function(e) {
  if (e.target === this) this.classList.remove('show');
};
// Limit preferences to 3
document.querySelectorAll('#preferencesForm input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', function() {
    let checked = document.querySelectorAll('#preferencesForm input[type="checkbox"]:checked');
    if (checked.length > 3) {
      this.checked = false;
      alert('Please select only 3 preferences.');
    }
  });
});
// Handle submit
document.getElementById('preferencesForm').onsubmit = function(e){
  e.preventDefault();
  let checked = Array.from(document.querySelectorAll('#preferencesForm input[type="checkbox"]:checked')).map(cb => cb.value);
  if(checked.length !== 3){ alert('Pick exactly 3 preferences!'); return; }
  alert('Preferences saved:\n' + checked.join(', '));
  document.getElementById('profileModal').classList.remove('show');
};


// Open Preferences Modal
document.getElementById('profileBtn').addEventListener('click', function () {
  document.getElementById('preference-modal').classList.add('show');
});
// Close Modal
document.getElementById('close-preferences').addEventListener('click', function () {
  document.getElementById('preference-modal').classList.remove('show');
});
// Close on outside click
document.getElementById('preference-modal').addEventListener('click', function (event) {
  if (event.target === this) this.classList.remove('show');
});

// Limit selection to three checkboxes
document.querySelectorAll('.preferences-form input[type="checkbox"]').forEach(function(cb) {
  cb.addEventListener('change', function() {
    let checked = document.querySelectorAll('.preferences-form input[type="checkbox"]:checked');
    if (checked.length > 3) {
      this.checked = false;
      alert('Please select only 3 preferences.');
    }
  });
});
// Initialize Map Section
function initMap() {
  const map = L.map('map').setView([0, 0], 13); // Default view

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Try to get user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        map.setView([lat, lng], 14);

        // Marker for user
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup("You're here 🧭")
          .openPopup();

        // Sample nearby hangout spots
        const hangouts = [
          { name: "Coffee Junction ☕", lat: lat + 0.002, lng: lng + 0.002 },
          { name: "Central Park 🌳", lat: lat - 0.0015, lng: lng - 0.001 },
          { name: "Gamer’s Lounge 🎮", lat: lat + 0.001, lng: lng - 0.002 }
        ];

        hangouts.forEach(h => {
          L.marker([h.lat, h.lng])
            .addTo(map)
            .bindPopup(`<b>${h.name}</b><br>Tap to hang out!`);
        });
      },
      (err) => {
        alert("Couldn't get your location. Showing default view.");
      }
    );
  } else {
    alert("Geolocation not supported by your browser.");
  }
}

// Call when map section is shown
document.addEventListener("DOMContentLoaded", initMap);


// Handle form submit
document.querySelector('.preferences-form').addEventListener('submit', function (e) {
  e.preventDefault();
  let checked = Array.from(document.querySelectorAll('.preferences-form input[type="checkbox"]:checked'))
                     .map(cb => cb.value);
  if (checked.length !== 3) {
    alert('You must pick exactly 3 preferences!');
    return;
  }
  alert('Preferences saved: ' + checked.join(', '));
  document.getElementById('preference-modal').classList.remove('show');
});
// Sample chat data
const sampleChats = [
  {
    name: "Coffee Buddies ☕",
    messages: [
      { from: "Aditi", text: "Hey! Meeting at 5 PM today?" },
      { from: "You", text: "Yep, I’ll be there!" }
    ]
  },
  {
    name: "Anime Fans 🎌",
    messages: [
      { from: "Rohan", text: "New One Piece episode is crazy!" },
      { from: "You", text: "Don’t spoil it 😭" }
    ]
  },
  {
    name: "Tech Geeks 💻",
    messages: [
      { from: "Priya", text: "Anyone tried the new AI tool?" },
      { from: "You", text: "Yep, super cool for coding!" }
    ]
  }
];

// Render chat list
function loadChats() {
  const chatList = document.getElementById("chatList");
  chatList.innerHTML = "";

  sampleChats.forEach((chat, index) => {
    const div = document.createElement("div");
    div.classList.add("chat-item");
    div.textContent = chat.name;
    div.onclick = () => openChat(index);
    chatList.appendChild(div);
  });
}

function openChat(index) {
  const chat = sampleChats[index];
  const messagesDiv = document.getElementById("chatMessages");
  const emptyState = document.querySelector(".chat-empty");
  const inputContainer = document.getElementById("chatInputContainer");

  emptyState.style.display = "none";
  messagesDiv.style.display = "block";
  inputContainer.style.display = "flex";

  messagesDiv.innerHTML = chat.messages
    .map(
      m =>
        `<div class="chat-message"><b>${m.from}:</b> ${m.text}</div>`
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", loadChats);


// Active users data
const activeUsers = {
    user1: {
        id: 'user1',
        name: 'Sarah',
        status: 'Looking for coffee buddies!',
        interests: ['Coffee', 'Books', 'Photography']
    },
    user2: {
        id: 'user2',
        name: 'Mike',
        status: 'Down for some outdoor activities',
        interests: ['Hiking', 'Sports', 'Music']
    },
    user3: {
        id: 'user3',
        name: 'Alex',
        status: 'Anyone want to grab lunch?',
        interests: ['Food', 'Gaming', 'Movies']
    },
    user4: {
        id: 'user4',
        name: 'Emma',
        status: 'Coffee and conversation?',
        interests: ['Art', 'Yoga', 'Travel']
    },
    user5: {
        id: 'user5',
        name: 'James',
        status: 'Game night anyone?',
        interests: ['Gaming', 'Tech', 'Anime']
    }
};

// Initialize Socket.IO
function initializeSocket() {
    socket = io(SOCKET_URL);

    socket.on('connect', () => {
        console.log('✅ Connected to real-time chat!');
        currentUser.id = socket.id;
        socket.emit('user-join', { name: currentUser.name });
    });

    socket.on('user-joined', (data) => {
        console.log(`👤 ${data.userName} joined. Total users: ${data.totalUsers}`);
        showNotification(`${data.userName} joined the chat!`);
    });

    socket.on('user-left', (data) => {
        console.log(`👋 ${data.userName} left. Total users: ${data.totalUsers}`);
    });

    socket.on('previous-messages', (messages) => {
        displayMessages(messages);
    });

    socket.on('new-message', (message) => {
        displayNewMessage(message);
    });

    socket.on('user-typing', (data) => {
        showTypingIndicator(data.userName);
    });

    socket.on('user-stop-typing', () => {
        hideTypingIndicator();
    });

    socket.on('new-hangout', async (data) => {
        showNotification(`New hangout created at ${data.place.name}!`);
        await fetchPlaces();
        loadHangoutSpots();
    });

    socket.on('disconnect', () => {
        console.log('❌ Disconnected from server');
    });
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--accent);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Display messages
function displayMessages(messages) {
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.innerHTML = messages.map(msg => createMessageHTML(msg)).join('');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Display new message
function displayNewMessage(message) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = createMessageHTML(message);
    messagesContainer.appendChild(messageDiv.firstChild);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Play sound or animation
    messageDiv.firstChild.style.animation = 'messageSlideIn 0.3s ease';
}

// Create message HTML
function createMessageHTML(msg) {
    const isOwn = msg.userId === currentUser.id;
    const time = new Date(msg.timestamp || msg.createdAt).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    return `
        <div class="message ${isOwn ? 'own' : ''}" style="animation: messageSlideIn 0.3s ease;">
            ${!isOwn ? `<div style="font-weight: bold; font-size: 0.85rem; color: var(--accent); margin-bottom: 0.25rem;">${msg.userName}</div>` : ''}
            <div>${msg.message}</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem;">${time}</div>
        </div>
    `;
}

// Typing indicators
function showTypingIndicator(userName) {
    hideTypingIndicator(); // Remove existing
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'message';
    typingDiv.style.opacity = '0.7';
    typingDiv.innerHTML = `<em>${userName} is typing...</em>`;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await fetchPlaces();
    loadHangoutSpots();
    await loadChats();
    initializeSocket();
    
    // Ask for username
    const userName = prompt('Enter your name:', currentUser.name);
    if (userName) {
        currentUser.name = userName;
        if (socket && socket.connected) {
            socket.emit('user-join', { name: currentUser.name });
        }
    }
});

// Fetch places from server
async function fetchPlaces() {
    try {
        const response = await fetch(`${API_URL}/places`);
        const data = await response.json();
        
        places = {};
        data.places.forEach(place => {
            places[place.id] = place;
        });
    } catch (error) {
        console.error('Error fetching places:', error);
    }
}

// Theme Toggle
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('light-mode');
}

// Navigation
function showSection(sectionName) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });

    document.getElementById(`${sectionName}Section`).classList.add('active');
    event.target.classList.add('active');
}

// Load Hangout Spots
function loadHangoutSpots() {
    const grid = document.getElementById('hangoutGrid');
    grid.innerHTML = '';

    Object.values(places).forEach(place => {
        const card = createHangoutCard(place);
        grid.appendChild(card);
    });
}

function createHangoutCard(place) {
    const card = document.createElement('div');
    card.className = 'hangout-card';
    card.onclick = () => showPlaceDetails(place.id);

    const activeHangouts = place.hangouts ? place.hangouts.filter(h => new Date(h.time) > new Date()) : [];

    const emojis = {
        'Cafe': '☕',
        'Park': '🌳',
        'Fun Spot': '🎮'
    };

    card.innerHTML = `
        <div style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">${emojis[place.type] || '📍'}</div>
        <h3>${place.name}</h3>
        <div class="hangout-info">
            <span>📍 ${place.location}</span>
            <span>⏰ ${place.timings}</span>
            <span>💰 ${place.fee}</span>
            <span>⭐ ${place.rating}/5</span>
        </div>
        ${activeHangouts.length > 0 ? `
            <div class="hangout-participants">
                👥 ${activeHangouts.length} active hangout${activeHangouts.length > 1 ? 's' : ''}
            </div>
        ` : ''}
        <div class="hangout-actions">
            <button class="action-btn" onclick="event.stopPropagation(); reviewPlace('${place.id}')">Review</button>
            <button class="action-btn" onclick="event.stopPropagation(); sharePlace('${place.id}')">Share</button>
        </div>
    `;

    return card;
}

// Place Details Modal
function showPlaceDetails(placeId) {
    const place = places[placeId];
    const modal = document.getElementById('placeModal');
    const content = document.getElementById('placeDetailsContent');

    const emojis = {
        'Cafe': '☕',
        'Park': '🌳',
        'Fun Spot': '🎮'
    };

    content.innerHTML = `
        <div style="font-size: 4rem; text-align: center; margin-bottom: 1rem;">${emojis[place.type] || '📍'}</div>
        <h2>${place.name}</h2>
        <div class="place-info">
            <div class="info-item">📍 <span>${place.location}</span></div>
            <div class="info-item">⏰ <span>${place.timings}</span></div>
            <div class="info-item">💰 <span>${place.fee}</span></div>
        </div>
        
        <div style="margin: 1.5rem 0;">
            <strong>Rate this place:</strong>
            <div class="rating-container">
                ${[1,2,3,4,5].map(i => `<span class="star ${i <= place.rating ? 'active' : ''}" onclick="ratePlaceStar(${i}, '${placeId}')">⭐</span>`).join('')}
            </div>
        </div>

        ${place.hangouts && place.hangouts.length > 0 ? `
            <div style="margin: 1.5rem 0;">
                <strong>Active Hangouts:</strong>
                ${place.hangouts.map(h => `
                    <div style="background: rgba(157, 78, 221, 0.2); padding: 1rem; border-radius: 10px; margin-top: 0.5rem;">
                        <div><strong>${h.title}</strong></div>
                        <div style="color: var(--text-secondary); font-size: 0.9rem;">
                            ${h.participants}/${h.maxPeople} joined • ${new Date(h.time).toLocaleString()}
                        </div>
                        <button class="action-btn" style="margin-top: 0.5rem; width: 100%;" onclick="joinHangout('${placeId}', '${h.id}')">Join Hangout</button>
                    </div>
                `).join('')}
            </div>
        ` : ''}

        <div class="modal-actions">
            <button class="modal-btn" onclick="sharePlace('${placeId}')">Share</button>
            <button class="modal-btn" onclick="bookPlace('${placeId}')">Book</button>
            <button class="modal-btn" onclick="showPlanHangout('${placeId}')">Plan Hangout</button>
        </div>
    `;

    modal.classList.add('active');
}

function closePlaceModal() {
    document.getElementById('placeModal').classList.remove('active');
}

async function ratePlaceStar(rating, placeId) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });

    try {
        const response = await fetch(`${API_URL}/places/${placeId}/rating`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating })
        });

        if (response.ok) {
            alert(`You rated this place ${rating} stars!`);
            await fetchPlaces();
            loadHangoutSpots();
        }
    } catch (error) {
        console.error('Error rating place:', error);
    }
}

function reviewPlace(placeId) {
    alert(`Opening review page for ${places[placeId].name}`);
}

function sharePlace(placeId) {
    const place = places[placeId];
    alert(`Sharing ${place.name}... You can send this to your friends in chat!`);
}

function bookPlace(placeId) {
    const place = places[placeId];
    const bookingConfirmed = confirm(`Book ${place.name}?`);
    
    if (bookingConfirmed) {
        alert(`Booking confirmed for ${place.name}!`);
        closePlaceModal();
        
        setTimeout(() => {
            const getDirections = confirm('Would you like to get directions to this location?');
            if (getDirections) {
                openDirections(placeId);
            }
        }, 500);
    }
}

function openDirections(placeId) {
    const place = places[placeId];
    const destination = `${place.coordinates.lat},${place.coordinates.lng}`;
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const origin = `${position.coords.latitude},${position.coords.longitude}`;
                const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
                window.open(googleMapsUrl, '_blank');
            },
            (error) => {
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;
                window.open(googleMapsUrl, '_blank');
            }
        );
    } else {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;
        window.open(googleMapsUrl, '_blank');
    }
}

// Plan Hangout
function showPlanHangout(placeId) {
    closePlaceModal();
    document.getElementById('planHangoutModal').classList.add('active');
    document.getElementById('hangoutForm').dataset.placeId = placeId;
}

function closePlanModal() {
    document.getElementById('planHangoutModal').classList.remove('active');
}

async function createHangout(event) {
    event.preventDefault();
    const placeId = document.getElementById('hangoutForm').dataset.placeId;
    const title = document.getElementById('hangoutTitle').value;
    const maxPeople = document.getElementById('hangoutPeople').value;
    const time = document.getElementById('hangoutTime').value;
    const description = document.getElementById('hangoutDescription').value;

    try {
        const response = await fetch(`${API_URL}/hangouts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                placeId,
                title,
                maxPeople,
                time,
                description
            })
        });

        if (response.ok) {
            alert('Hangout created successfully! Everyone will be notified.');
            closePlanModal();
            event.target.reset();
        }
    } catch (error) {
        console.error('Error creating hangout:', error);
        alert('Failed to create hangout. Please try again.');
    }
}

async function joinHangout(placeId, hangoutId) {
    const place = places[placeId];
    const hangout = place.hangouts.find(h => h.id === hangoutId);
    
    if (hangout && hangout.participants < hangout.maxPeople) {
        hangout.participants++;
        alert(`You joined "${hangout.title}"! ${hangout.participants}/${hangout.maxPeople} people joined.`);
        closePlaceModal();
        await fetchPlaces();
        loadHangoutSpots();
    } else {
        alert('This hangout is full!');
    }
}

// Chat Functions
async function loadChats() {
    try {
        const response = await fetch(`${API_URL}/chats`);
        const data = await response.json();
        
        const chatList = document.getElementById('chatList');
        
        chatList.innerHTML = data.chats.map(chat => {
            const icon = chat.type === 'bot' ? '🤖' : 
                        chat.type === 'group' ? '👥' : 
                        chat.type === 'community' ? '🌐' : 
                        chat.type === 'forum' ? '💬' : '👤';
            
            return `
                <div class="chat-item" onclick="openChat('${chat.id}', '${chat.name}')">
                    <div><strong>${icon} ${chat.name}</strong></div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">
                        ${chat.type} • <span style="color: #00ff00;">● Live</span>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading chats:', error);
    }
}

function openChat(chatId, chatName) {
    currentChat = chatId;
    document.querySelector('.chat-empty').style.display = 'none';
    document.getElementById('chatMessages').style.display = 'block';
    document.getElementById('chatInputContainer').style.display = 'flex';

    document.querySelectorAll('.chat-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.chat-item').classList.add('active');

    // Join the chat room via Socket.IO
    socket.emit('join-chat', chatId);
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message || !currentChat || !socket) return;

    // Send message via Socket.IO
    socket.emit('send-message', {
        chatId: currentChat,
        message,
        userName: currentUser.name
    });
    
    input.value = '';
    socket.emit('stop-typing', { chatId: currentChat });
}

// Handle typing indicator
document.getElementById('chatInput')?.addEventListener('input', (e) => {
    if (!currentChat || !socket) return;
    
    clearTimeout(typingTimeout);
    
    if (e.target.value.trim()) {
        socket.emit('typing', { chatId: currentChat, userName: currentUser.name });
        
        typingTimeout = setTimeout(() => {
            socket.emit('stop-typing', { chatId: currentChat });
        }, 1000);
    } else {
        socket.emit('stop-typing', { chatId: currentChat });
    }
});

// Add Chat Modal
function showAddChatModal() {
    document.getElementById('addChatModal').classList.add('active');
}

function closeAddChatModal() {
    document.getElementById('addChatModal').classList.remove('active');
}

function addUserChat() {
    const username = prompt('Enter username to chat with:');
    if (username) {
        alert(`Starting chat with ${username}`);
        closeAddChatModal();
        loadChats();
    }
}

function joinForum() {
    const forumName = prompt('Enter forum name to join:');
    if (forumName) {
        alert(`Joining forum: ${forumName}`);
        closeAddChatModal();
        loadChats();
    }
}

function joinCommunity() {
    const communityName = prompt('Enter community name to join:');
    if (communityName) {
        alert(`Joining community: ${communityName}`);
        closeAddChatModal();
        loadChats();
    }
}

// Enter key for chat
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && document.getElementById('chatInput') === document.activeElement) {
        sendMessage();
    }
});

// Show user details
function showUserDetails(userId) {
    const user = activeUsers[userId];
    const modal = document.getElementById('placeModal');
    const content = document.getElementById('placeDetailsContent');

    content.innerHTML = `
        <div style="font-size: 4rem; text-align: center; margin-bottom: 1rem;">👤</div>
        <h2>${user.name}</h2>
        <div style="text-align: center; color: var(--text-secondary); margin-bottom: 1.5rem;">
            <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(0, 255, 0, 0.2); padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid rgba(0, 255, 0, 0.3);">
                <span style="width: 10px; height: 10px; background: #00ff00; border-radius: 50%; display: inline-block;"></span>
                <span>Active Now</span>
            </div>
        </div>
        
        <div class="place-info">
            <div class="info-item">💬 <span>${user.status}</span></div>
            <div class="info-item">
                ❤️ <span>${user.interests.join(', ')}</span>
            </div>
        </div>

        <div class="modal-actions">
            <button class="modal-btn" onclick="sendMessageToUser('${userId}')">Send Message</button>
            <button class="modal-btn" onclick="inviteToHangout('${userId}')">Invite to Hangout</button>
            <button class="modal-btn" onclick="viewProfile('${userId}')">View Profile</button>
        </div>
    `;

    modal.classList.add('active');
}

function sendMessageToUser(userId) {
    const user = activeUsers[userId];
    closePlaceModal();
    alert(`Opening chat with ${user.name}...`);
    showSection('chat');
}

function inviteToHangout(userId) {
    const user = activeUsers[userId];
    alert(`Invitation sent to ${user.name}!`);
}

function viewProfile(userId) {
    const user = activeUsers[userId];
    alert(`Viewing ${user.name}'s profile...`);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
    @keyframes messageSlideIn {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(style);
