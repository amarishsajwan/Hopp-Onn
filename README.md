# hoppOn# HoppOn Ride-Sharing App 🚗

HoppOn is a ride-sharing app designed to make traveling more convenient in areas where public transport is unreliable, rare, or unavailable. Users can create events based on their routes, allowing others to share rides with them at minimal costs, similar to public transportation.

---

## 📸 Screenshots

<img src="https://github.com/amarishsajwan/Hopp-Onn/blob/main/frontend/screens/index.jpg" width="200" height="400" > <img src="https://github.com/amarishsajwan/Hopp-Onn/blob/main/frontend/screens/user_profile.jpg" width="200" height="400" > <img src="https://github.com/amarishsajwan/Hopp-Onn/blob/main/frontend/screens/add_ride.jpg" width="200" height="400" >

<img src="https://github.com/amarishsajwan/Hopp-Onn/blob/main/frontend/screens/search-ride.jpg" width="200" height="400" > <img src="https://github.com/amarishsajwan/Hopp-Onn/blob/main/frontend/screens/search_ride2.jpg" width="200" height="400" > <img src="https://github.com/amarishsajwan/Hopp-Onn/blob/main/frontend/screens/search_result.jpeg" width="200" height="400" >

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

## 🔐 Authentication

HoppOn uses **Firebase Phone OTP Authentication** for user login and signup. Here's how it works:

- Users sign up or log in using their phone numbers.
- An OTP is sent to the entered number for verification.
- After successful OTP verification, a session is created with a **JWT token** for authentication with the backend.

### 🔑 JWT Token

Once the user is authenticated, the app uses a **JWT token** for secure communication with the backend APIs.

---

## 📡 Backend Data Flow

- **User Details**: User profiles are fetched from the backend using REST APIs.
- **Events (Rides)**: Rides are created and fetched based on user inputs for pickup and drop locations. The backend returns the relevant data such as ride details, driver info, etc.
- **Real-time Data**: The app plans to integrate real-time data for future updates, such as live ride tracking.

---

## ⚙️ Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/hoppOn.git
   cd hoppOn
   ```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💡 Future Enhancements

- Real-time ride tracking.
- Rating system for drivers and riders.
- Push notifications for ride updates and reminders.

## 📧 Contact

For any inquiries or support, please reach out to [amarish.sajwan@gmail.com](mailto:amarish.sajwan@gmail.com).
