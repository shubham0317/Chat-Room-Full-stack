

---

# Chat-Room Application

A real-time chat application built as an internship project for Unified Mentor. This full-stack application allows users to sign up, log in, send text and image messages, update their profiles, and customize the interface with various themes. It leverages modern web technologies to provide a secure, responsive, and interactive user experience.

## Table of Contents
- Features
- Technologies Used
- Installation
- Usage
- Project Structure
- Future Enhancements
- Contributing
- License

## Features
- **User Authentication:** Sign up, log in, and log out securely with JWT-based authentication.
- **Real-Time Messaging:** Send and receive text and image messages instantly using Socket.io.
- **Profile Management:** Update your profile picture (max 10MB) with Cloudinary integration.
- **User Sidebar:** View a list of users with online/offline status for easy chat selection.
- **Customizable Themes:** Choose from a variety of themes (e.g., light, dark, cupcake) using Tailwind CSS.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.

## Technologies Used
### Frontend
- **React**: Dynamic, component-based UI.
- **Tailwind CSS**: Utility-first styling for responsive design.
- **Lucide React**: Icons for enhanced UI.
- **Zustand**: Lightweight state management.
- **Socket.io-client**: Real-time communication with the backend.

### Backend
- **Express.js**: Handles API requests and routing.
- **MongoDB**: NoSQL database with Mongoose for data modeling.
- **JWT**: Secure user authentication via tokens.
- **Cloudinary**: Image upload and management.
- **Socket.io**: Real-time message updates.
- **Bcrypt**: Password hashing for security.

## Installation
Follow these steps to set up and run the project locally.

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (Local or Atlas)
- **Cloudinary Account** (For image uploads)

### Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/chat-room.git
   cd chat-room
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Set Up Environment Variables:**
   - Create a `.env` file in the `server` directory based on the example below:
     ```
     PORT=5001
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.e8luq.mongodb.net/chat_db?retryWrites=true&w=majority
     JWT_TOKEN=your_jwt_secret
     NODE_ENV=development
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```
   - Replace placeholders with your MongoDB URI, JWT secret, and Cloudinary credentials.

4. **Install Frontend Dependencies:**
   ```bash
   cd ../client
   npm install
   ```

5. **Run the Backend:**
   ```bash
   cd ../server
   npm run start
   ```
   - The server will run on `http://localhost:5001`.

6. **Run the Frontend:**
   ```bash
   cd ../client
   npm run start
   ```
   - The client will run on `http://localhost:5173`.

## Usage
1. **Open the Application:**
   - Navigate to `http://localhost:5173` in your browser.

2. **Sign Up or Log In:**
   - New users: Click "Sign Up" to create an account with your full name, email, and password.
   - Existing users: Click "Log In" with your email and password.

3. **Start Chatting:**
   - Select a user from the sidebar to begin a conversation.
   - Send text messages or attach images (max 10MB) using the chat input.

4. **Manage Profile:**
   - Go to the "Profile" page via the navbar to view or update your profile picture.

5. **Customize Theme:**
   - Access "Settings" from the navbar to select a theme with a live preview.

## Project Structure
```
chat-room/
├── client/              # Frontend code
│   ├── src/
│   │   ├── components/  # Reusable UI components (Navbar, Sidebar, etc.)
│   │   ├── pages/       # Page components (HomePage, LoginPage, etc.)
│   │   ├── store/       # Zustand stores for state management
│   │   ├── lib/         # Utilities (axios, formatting functions)
│   │   └── App.jsx      # Main app component with routing
├── server/              # Backend code
│   ├── controllers/     # Logic for auth and messages
│   ├── models/          # Mongoose schemas (User, Message)
│   ├── routes/          # API endpoints
│   ├── lib/             # Utilities (Cloudinary, DB, Socket.io)
│   ├── index.js         # Entry point for Express server
│   └── .env             # Environment variables
```

## Future Enhancements
- **Group Chats:** Add support for multi-user conversations.
- **Message Search:** Enable searching through messages or users.
- **Notifications:** Implement push notifications for new messages.
- **Encryption:** Add end-to-end encryption for enhanced privacy.
- **Multi-Language Support:** Incorporate internationalization for broader accessibility.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

