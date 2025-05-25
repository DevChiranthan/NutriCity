# NutriCity

**NutriCity** is a web platform designed to support individuals living alone—especially students and working professionals—by providing personalized grocery lists, meal suggestions based on festival themes, and a direct connection to trusted local vendors.

---

## Features

### For Students / Solo Users:
- **Smart Grocery Lists**: Get curated grocery suggestions based on your budget and recent festivals.
- **Festival-Inspired Meals**: Receive daily meal ideas (3 per day) with simple recipes inspired by cultural or seasonal festivals.
- **Download & Share Lists**: Download grocery lists as formatted PDFs or share them easily with roommates.
- **Dashboard Overview**: Track your grocery and meal planning progress from the main dashboard.
- **Community Board**: Connect with others facing similar challenges and interact with local vendors.

### For Vendors:
- **Vendor Dashboard Access** (selected vendors): Monitor sales and manage inventory.
- **Offers & Deals Page**: Post discounts and special promotions.
- **Direct Interaction**: Communicate with customers via community board features.

---

## Tech Stack

- **Frontend**: React with TypeScript
- **Backend**: Node.js with Express.js
- **Database**: MongoDB Atlas
- **Authentication**: Google OAuth
- **Deployment**: 
  - Frontend: Netlify  
  - Backend: Render

---

## Azure Integration

- We're currently integrating **Azure Notification Hubs** to send real-time push notifications (e.g., festival alerts, vendor deals).  
  *Note: This feature is still under development and will be added soon.*

---

## Known Notes

- **Login Delay**: Since Google OAuth is used and the app is deployed on free-tier services, logging in with a new Gmail account may take a little longer. Please be patient.
- We recommend exploring **both Student and Vendor** login views to fully experience the app.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
