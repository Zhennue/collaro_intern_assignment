# Collaro Customer Dashboard

This is a customer management dashboard I built using Next.js and React. It's got a backend API with Express and uses Material-UI for the frontend components. The main thing it does is let you browse through customers, see their orders, and edit some stuff inline.

## What it does

- Browse customers in a table with sorting and pagination
- Click on any customer row to see their orders
- Edit customer status and order item sizes right in the table
- Everything updates in real-time without page refreshes
- Works on mobile too (responsive design)

## Getting it running

You'll need Node.js installed (version 16 or newer should work fine).

First, clone this repo and navigate into it:
```bash
git clone <your-repository-url>
cd collaro_intern_assignment
```

### Backend setup

```bash
cd backend
npm install
npm run dev
```

This starts the API server on port 3001. It uses some mock data I generated with Faker.js.

### Frontend setup

Open another terminal:
```bash
cd frontend
npm install
npm run dev
```

The frontend runs on port 3000. Once both are running, just go to http://localhost:3000 in your browser.

## How it's organized

```
collaro_intern_assignment/
├── backend/
│   ├── data/mockData.js     # Fake customer/order data
│   ├── routes/customers.js  # API endpoints
│   ├── server.js           # Express server
│   └── package.json
├── frontend/
│   ├── src/app/
│   │   ├── components/     # React components
│   │   ├── lib/           # API calls and utilities
│   │   ├── page.js        # Main dashboard page
│   │   └── theme.js       # Material-UI theme
│   └── package.json
└── README.md
```

## The main components

- **CustomerTable**: The main table with pagination and sorting
- **CustomerRow**: Individual customer rows that expand to show orders
- **OrdersTable**: Shows orders when you expand a customer
- **InlineSizeEditor**: Lets you edit order item sizes directly in the table
- **InlineStatusEditor**: Edit customer status inline

## API endpoints

- `GET /api/customers` - Gets paginated customer list with sorting
- `GET /api/customers/:id/orders` - Gets orders for a specific customer

The API supports query parameters for pagination (`page`, `limit`) and sorting (`sortBy`, `order`).

## Troubleshooting

**Port conflicts**: If 3000 or 3001 are taken, the apps will usually suggest alternative ports.

**CORS issues**: Make sure the backend is running before starting the frontend.

**Dependencies not installing**: Try clearing npm cache with `npm cache clean --force` and deleting node_modules, then reinstall.

**Module not found**: Double-check you're in the right directory when running commands.

## Tech stack

**Frontend:**
- Next.js 15.4.5
- React 19.1.0
- Material-UI for components
- Emotion for styling

**Backend:**
- Express.js
- CORS middleware
- Faker.js for mock data
- date-fns for date handling

## Features I implemented

The assignment asked for React/Next.js with Material-UI, complex data structures, and advanced table functionality. Here's what I built:

- Multi-level data (customers → orders → order items)
- Expandable table rows
- Inline editing for different data types
- Sorting and pagination
- Responsive design
- Real-time updates

The trickiest part was getting the nested inline editing to work smoothly - managing state across multiple component levels while keeping the UI responsive.

---

That's about it! The code is pretty well commented if you want to dig into the implementation details.