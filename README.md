<!-- # hoppOn# HoppOn Ride-Sharing App 🚗

HoppOn is a ride-sharing app designed to make traveling more convenient in areas where public transport is unreliable, rare, or unavailable. Users can create events based on their routes, allowing others to share rides with them at minimal costs, similar to public transportation.

---

## 🎯 Features

- Users can create events specifying their routes.
- Riders can search for available rides based on route preferences.
- Allows for minimal ride charges similar to public transportation rates.
- Ideal for areas with limited or no public transport.

---

## 🛠️ Tech Stack

### Frontend:

- **React Native Expo**
- **JavaScript**
- **Tailwind CSS**

### Backend:

- **TypeScript**
- **Node.js**
- **PrismaDB**
- **MongoDB**
- **REST APIs**

---

## 📸 Screenshots

<img src="https://github.com/amarishsajwan/Hopp-Onn/blob/main/frontend/screens/index.jpg" width="200" height="400" > <img src="https://github.com/amarishsajwan/Hopp-Onn/blob/main/frontend/screens/user_profile.jpg" width="200" height="400" > <img src="https://github.com/amarishsajwan/Hopp-Onn/blob/main/frontend/screens/add_ride.jpg" width="200" height="400" >

<img src="https://github.com/amarishsajwan/Hopp-Onn/blob/main/frontend/screens/search-ride.jpg" width="200" height="400" > <img src="https://github.com/amarishsajwan/Hopp-Onn/blob/main/frontend/screens/search_ride2.jpg" width="200" height="400" > <img src="https://github.com/amarishsajwan/Hopp-Onn/blob/main/frontend/screens/search_result.jpeg" width="200" height="400" >

---

## ⚙️ Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/hoppOn.git
   cd hoppOn
   ``` -->

HoppOn Ride-Sharing App 🚗
HoppOn is a ride-sharing app designed to facilitate easy travel in areas with limited or unreliable public transport. Users can create and share rides, allowing others to join at minimal costs—similar to using public transportation.

🚀 Features
Create Rides: Users can create ride events by specifying pickup and drop-off locations.
Search for Rides: Riders can search for available rides based on route preferences.
Minimal Costs: Ride costs are minimal, designed to resemble public transportation rates.
User Profiles: View ride creators’ profiles for safety and ease of communication.
Real-time Ride Details: Get ride details, including time, pickup/drop locations, and the ride creator's profile information.
🛠️ Tech Stack
Frontend:
React Native Expo: Cross-platform mobile development framework.
JavaScript: Core programming language.
Tailwind CSS: For consistent, responsive styling.
Backend:
Node.js: Backend framework for handling API requests.
TypeScript: Strongly typed JavaScript to ensure better code quality.
Prisma: Database ORM for working with MongoDB.
MongoDB: NoSQL database to store ride data.
REST APIs: For seamless communication between the frontend and backend.
📸 Screenshots
Home Screen
<img src="./frontend/screens/index.jpg" alt="Home Screen" width="250"/>
Profile Screen
<img src="./frontend/screens/user_profile.jpg" alt="Profile Screen" width="250"/>
Create Ride Screen
<img src="./frontend/screens/add_ride.jpg" alt="Create Ride Screen" width="250"/>
Search Ride Screen
<img src="./frontend/screens/search-ride.jpg" alt="Search Ride Screen" width="250"/>
⚙️ Installation and Setup
Follow the steps below to set up and run the HoppOn app locally.

Prerequisites
Node.js installed on your machine.
Expo CLI installed globally:
bash
Copy code
npm install -g expo-cli

1. Clone the Repository
   bash
   Copy code
   git clone https://github.com/your-username/hoppOn.git
   cd hoppOn
2. Install Dependencies
   bash
   Copy code
   cd frontend
   npm install
   bash
   Copy code
   cd backend
   npm install
3. Set Up Environment Variables
   Create a .env file in the backend directory and add your environment variables:
   bash
   Copy code
   DATABASE_URL=mongodb://localhost:27017/hoppOnDB
   FIREBASE_API_KEY=your_firebase_api_key
   JWT_SECRET=your_jwt_secret
4. Run the Backend
   In the backend directory, start the backend server:

bash
Copy code
npm run dev 5. Run the Frontend
In the frontend directory, start the Expo development server:

bash
Copy code
expo start
🚦 API Endpoints
Create a Ride
http
Copy code
POST /api/v1/createEvent
Request Body:
json
Copy code
{
"pickupLocation": "Location A",
"dropLocation": "Location B",
"time": "2024-04-08T09:30:00Z"
}
Search Rides
http
Copy code
POST /api/v1/findEvent
Request Body:
json
Copy code
{
"pickupId": "123",
"dropId": "456",
"time": "1682948400"
}
🤝 Contributing
Contributions are welcome! Feel free to fork the project and create a pull request. For major changes, please open an issue first to discuss what you would like to change.

Fork the repository.
Create your feature branch:
bash
Copy code
git checkout -b feature/YourFeature
Commit your changes:
bash
Copy code
git commit -m 'Add some feature'
Push to the branch:
bash
Copy code
git push origin feature/YourFeature
Open a pull request.
📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

💡 Future Enhancements
Real-time ride tracking.
Rating system for drivers and riders.
Push notifications for ride updates and reminders.
Multilingual support for global users.
📧 Contact
For any inquiries or support, please reach out to your-email@example.com.
