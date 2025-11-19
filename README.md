# 🎓 PlateShare – Community Food Sharing

**PlateShare**  is a full-stack MERN application designed to reduce food waste by connecting people who have surplus food with those in need. Users can easily post food items they wish to donate, while others can browse available items and submit requests to receive them. The platform fosters community engagement, promotes sustainability, and ensures that extra food reaches those who can benefit from it.

![SkillSwap Preview](https://i.ibb.co.com/JWwMGHk8/localhost-5174-2.png)

---

## 🔗 Live Demo

🚀 [Click Here to Explore PlateShare](https://plateshare-3f0ad.web.app/)

---

## 📲 App Features

* **Post Food Donations:** Easily share surplus food with the community by creating a donation listing.  
* **Browse Available Food:** Explore a variety of food items posted by other users in your area.  
* **Request Donations:** Request food items you need and connect with donors directly.  
* **Donation Status Tracking:** Keep track of your requests and see when they are accepted or rejected.  
* **User Profiles:** View donor and requester profiles to build trust within the community.  
* **Reduce Food Waste:** Contribute to minimizing food waste while helping those in need.  

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, React Router, Axios  
* **Backend:** Node.js, Express.js  
* **Styling & Components:** Tailwind CSS, DaisyUI  
* **Database:** MongoDB, Mongoose  
* **Authentication:** JWT (JSON Web Tokens), bcrypt  
* **Deployment:** Vercel / Netlify (frontend), Render / Heroku (backend)  
* **Other Tools:** Postman (API testing), Git & GitHub (version control)
* **Animations:** AOS (Animate on Scroll)  
* **Notifications:** react-hot-toast , SweatAlert2
* **Carousels & Sliders:** Swiper.js  
* **Images:** Sourced from [Pexels](https://imgbb.com/) and hosted on [imgbb](https://imgbb.com/)  
* **State Management:** React Hooks (useState, useEffect, etc.)
* **Icons:** React Icon

---

## 📂 Project Structure

```
/project-folder
├── public/                 # Public assets like index.html
├── src/
│ ├── assets/               # Images, icons, media
│ ├── components/           # Reusable React components
│ ├── hooks/                # Custom React hooks
│ ├── layouts/              # Layout components for pages
│ ├── pages/                # Individual page components
│ ├── routes/               # Routing configuration files
│ ├── App.jsx               # Main App component
│ ├── index.css             # Base CSS
│ ├── App.css               # Global styles
│ └── main.jsx              # Entry point for React
├── .gitignore              # Git ignore file
├── package.json            # Project metadata & dependencies
├── package-lock.json       # Dependency lock
└── vite.config.js          # Vite configuration
```

---

## ⚙️ How It Works

1. **Sign Up / Login:** Users create an account or log in to access the platform.  
2. **Post Food Donations:** Donors can add food items they want to share, including details like quantity, description, and pickup time.  
3. **Browse Food Listings:** Other users can browse available food items in their area.  
4. **Request Food:** Users can request a donation they want. The donor will be notified of the request.  
5. **Accept / Reject Requests:** Donors review incoming requests and can accept or reject them.  
6. **Track Status:** Users can see the status of their requests and donations—accepted, rejected, or pending.  
7. **Connect & Share:** Once a request is accepted, users coordinate pickup and enjoy sharing food, reducing waste in the community.  


---

## 💻 Installation & Setup

Follow these steps to run the PlateShare project locally:

1. **Clone the repository:**  
```bash
git clone https://github.com/Mahbub-Zaman/PlateShare-Client.git
```

2. **Navigate to the project folder**

```bash
cd PlateShare-Client
```

3. **Install dependencies**

```bash
npm install
```
4. **Set up environment variables:**
    * Create a `.env` file in the root directory.
    * Add the required variables `(e.g., API URLs, JWT secret, etc.)`.

5. **Start the development server**

```bash
npm run dev
```

---

## 📌 Future Improvements

* Add **AI chatbot** 
* Add **dark mode UI**  
* Enable **booking and scheduling** features  
* Implement **google map** 

