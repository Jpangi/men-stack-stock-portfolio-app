# Stock Portfolio Tracker
![Homepage](image.png)
A full-stack web application for managing personal stock portfolios with user authentication, CRUD operations, and interactive data visualization. Built with the MEN stack (MongoDB, Express.js, Node.js) and EJS templating.

## Features

- **User Authentication**: Secure sign up, sign in, and logout with bcrypt password hashing
- **Stock Management**: Full CRUD operations (Create, Read, Update, Delete) for stock entries
- **Portfolio Visualization**: Interactive doughnut chart displaying portfolio allocation using Chart.js
- **Profit/Loss Tracking**: Real-time calculation of profit/loss for each stock
- **Responsive Design**: Modern, mobile-friendly UI with Robinhood-inspired green theme
- **Session Management**: Secure sessions stored in MongoDB
- **User Dashboard**: Personalized portfolio view with visual analytics

## Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose ODM
- express-session with connect-mongo for session management
- bcrypt for password encryption
- method-override for RESTful routing

**Frontend:**
- EJS templating engine
- Chart.js for data visualization
- Custom CSS with gradient effects and animations

## Project Structure

```
├── server.js                       # Main application entry point
├── controllers/
│   ├── auth.js                     # Authentication routes
│   ├── stocks.js                   # Stock CRUD operations
│   └── users.js                    # User profile routes
├── middleware/
│   ├── is-signed-in.js             # Authentication middleware
│   └── pass-user-to-view.js        # User context middleware
├── models/
│   └── users.js                    # User and Stock schemas
├── views/
│   ├── auth/
│   │   ├── sign-in.ejs             # Sign in form
│   │   └── sign-up.ejs             # Sign up form
│   ├── users/
│   │   ├── index.ejs               # User portfolio dashboard
│   │   └── show.ejs                # Stock list view
│   ├── partials/
│   │   └── _navbar.ejs             # Navigation bar
│   ├── index.ejs                   # Landing page
│   ├── new.ejs                     # Add new stock form
│   └── edit.ejs                    # Edit stock form
└── public/
    ├── style.css                   # Main application styles
    └── homepage.css                # Landing page styles
```

## Data Models

### User Schema
```javascript
{
  email: String (required),
  username: String (required),
  password: String (required, hashed),
  stocks: [Stock Schema]
}
```

### Stock Schema (Embedded)
```javascript
{
  tickerSymbol: String (required),
  companyName: String (required),
  sharesOwned: Number (required),
  purchasePrice: Number (required),
  purchaseDate: Date (required),
  currentPrice: Number (required)
}
```

## Dependencies

```json
{
  "bcrypt": "^6.0.0",
  "chart.js": "^4.5.1",
  "connect-mongo": "^5.1.0",
  "dotenv": "^17.2.3",
  "ejs": "^3.1.10",
  "express": "^5.1.0",
  "express-session": "^1.18.2",
  "method-override": "^3.0.0",
  "mongoose": "^8.19.1",
  "nodemon": "^3.1.10"
}
```

## Usage Guide

1. **Create an Account**
   - Navigate to the home page
   - Click "Sign Up"
   - Enter email, username, and password
   - Confirm password and submit

2. **Sign In**
   - Click "Sign In" from the home page
   - Enter your username and password

3. **Add Stocks**
   - Click "New Stock" in the navigation
   - Fill in stock details:
     - Ticker symbol (e.g., AAPL, GOOGL)
     - Company name
     - Number of shares owned
     - Purchase price per share
     - Purchase date
     - Current price per share
   - Submit the form

4. **View Portfolio**
   - Click "Portfolio" to see your interactive chart
   - View allocation breakdown with color-coded doughnut chart
   - Each stock displays total value held

5. **Manage Stocks**
   - Click "My Stocks" to view your stock list
   - See profit/loss for each position
   - Edit stock details using the "Edit" button
   - Delete stocks using the "Delete" button

## Features in Detail

### Security
- Passwords hashed with bcrypt (10 salt rounds)
- Session-based authentication
- Protected routes requiring sign-in
- User authorization (users can only access their own data)

### Data Visualization
- Interactive Chart.js doughnut chart
- Random color generation for each stock
- Displays total value by position
- Responsive canvas that scales with screen size

### User Experience
- Modern dark theme with Robinhood-inspired green accents
- Smooth animations and transitions
- Responsive design for mobile and desktop
- Hover effects on interactive elements
- Clear visual feedback for all actions


## Future Enhancements

Potential features for future development:
- Real-time stock price API integration
- Historical performance tracking
- Multiple chart types (line, bar, etc.)
- Portfolio performance metrics
- Export data to CSV/PDF
- Stock search with autocomplete
- api integration

