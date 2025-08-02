# Collaro Customer Dashboard

A full-stack customer management dashboard built with Next.js, React, Material-UI, and Express.js. This application provides an interactive interface for managing customers, their orders, and order items with advanced table manipulations and inline editing capabilities.

## 🚀 Features

- **Customer Management**: View and manage customer information with expandable rows
- **Order Tracking**: Detailed order management with nested data structure
- **Interactive Tables**: Sorting, pagination, and inline editing functionality
- **Material-UI Components**: Modern, responsive design using MUI
- **Real-time Updates**: Dynamic status and size editing with immediate feedback
- **Multi-level Data**: Complex relational data structure (Customers → Orders → Order Items)

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16.0 or higher)
- **npm** (comes with Node.js)

You can check your versions by running:
```bash
node --version
npm --version
```

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd collaro_intern_assignment
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

The backend uses the following dependencies:
- Express.js for the server
- CORS for cross-origin requests
- dotenv for environment variables
- Faker.js for mock data generation
- date-fns for date manipulation

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

The frontend uses:
- Next.js 15.4.5 with React 19.1.0
- Material-UI (MUI) for components and styling
- Emotion for CSS-in-JS styling
- Faker.js for additional mock data
- date-fns for date formatting

## 🚀 Running the Application

### Method 1: Run Both Services Separately (Recommended)

#### Start the Backend Server

1. Open a terminal and navigate to the backend directory:
```bash
cd backend
```

2. Start the development server:
```bash
npm run dev
```

The backend server will start on `http://localhost:3001` (or the port specified in your environment variables).

#### Start the Frontend Application

1. Open a **new terminal** and navigate to the frontend directory:
```bash
cd frontend
```

2. Start the Next.js development server:
```bash
npm run dev
```

The frontend application will start on `http://localhost:3000`.

### Method 2: Using Separate Terminal Windows

1. **Terminal 1 (Backend)**:
```bash
cd backend && npm run dev
```

2. **Terminal 2 (Frontend)**:
```bash
cd frontend && npm run dev
```

## 🌐 Accessing the Application

Once both servers are running:

1. Open your web browser
2. Navigate to `http://localhost:3000`
3. The application should load with the customer dashboard

## 📁 Project Structure

```
collaro_intern_assignment/
├── backend/
│   ├── data/
│   │   └── mockData.js          # Mock customer and order data
│   ├── routes/
│   │   └── customers.js         # Customer API routes
│   ├── .env                     # Environment variables
│   ├── package.json             # Backend dependencies
│   └── server.js                # Express server setup
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── components/      # React components
│   │       ├── lib/            # Utility functions and API calls
│   │       ├── globals.css     # Global styles
│   │       ├── layout.js       # App layout
│   │       ├── page.js         # Main page component
│   │       └── theme.js        # MUI theme configuration
│   ├── public/                 # Static assets
│   ├── package.json            # Frontend dependencies
│   └── next.config.mjs         # Next.js configuration
└── README.md                   # This file
```

## 🔧 Available Scripts

### Backend Scripts
- `npm run dev` - Start the development server with nodemon (auto-restart on changes)

### Frontend Scripts
- `npm run dev` - Start the Next.js development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   - If port 3000 or 3001 is already in use, you can specify different ports:
   - Backend: Set `PORT=3002` in your `.env` file
   - Frontend: Next.js will automatically suggest an alternative port

2. **Dependencies Not Installing**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and `package-lock.json`, then run `npm install` again

3. **CORS Issues**
   - Ensure the backend server is running before starting the frontend
   - Check that the API endpoints in the frontend match the backend URLs

4. **Module Not Found Errors**
   - Make sure you're in the correct directory when running commands
   - Verify all dependencies are installed with `npm install`

## 🔄 Development Workflow

1. Make sure both backend and frontend servers are running
2. The frontend will automatically reload when you make changes
3. The backend will restart automatically when you modify server files (thanks to nodemon)
4. Check the browser console and terminal for any error messages

## 📝 API Endpoints

The backend provides the following API endpoints:

- `GET /api/customers` - Retrieve all customers with pagination and search
- `GET /api/customers/:id/orders` - Get orders for a specific customer

## 🎨 UI Features

- **Expandable Rows**: Click on customer rows to view their orders
- **Inline Editing**: Edit customer status and order item sizes directly in the table
- **Sorting**: Click column headers to sort data
- **Pagination**: Navigate through large datasets efficiently
- **Responsive Design**: Works on desktop and mobile devices

## 📄 Assignment Requirements Met

✅ **React & Next.js Implementation**: Uses Next.js 15.4.5 with React 19.1.0  
✅ **Material-UI Integration**: Full MUI component library implementation  
✅ **Complex Multi-level Data**: Customer → Orders → Order Items hierarchy  
✅ **Advanced Table Manipulations**: Sorting, pagination, expandable rows, inline editing  
✅ **Interactive Dashboard**: Master-detail views with smooth transitions  

---

**Happy coding! 🎉**

For any issues or questions, please check the troubleshooting section above or review the code comments for additional guidance.