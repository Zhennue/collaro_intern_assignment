# Design Choices & What I Learned

## State Management - Keeping It Simple

I went with local React state using `useState` hooks instead of something like Redux or Context API. Honestly, for a dashboard this size, it felt like overkill to bring in heavy state management.

Here's how I structured the main table state in [`CustomerTable.jsx`](frontend/src/app/components/CustomerTable.jsx:23-30):

```javascript
const [customers, setCustomers] = useState([]);
const [page, setPage] = useState(1);
const [limit, setLimit] = useState(10);
const [sortBy, setSortBy] = useState("name");
const [order, setOrder] = useState("asc");
const [total, setTotal] = useState(0);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

Why I chose this approach:
- **Simple to debug** - All the state is right there in the component
- **Fast to implement** - No boilerplate, just useState and go
- **Good enough performance** - React's pretty smart about re-renders
- **Auto-syncs with backend** - The useEffect with dependencies handles server calls automatically

For individual rows, each [`CustomerRow`](frontend/src/app/components/CustomerRow.jsx:21-26) manages its own state:

```javascript
const [expanded, setExpanded] = useState(false);
const [loading, setLoading] = useState(false);
const [orders, setOrders] = useState([]);
const [editingStatus, setEditingStatus] = useState(false);
const [ordersError, setOrdersError] = useState(null);
```

This keeps things isolated - when you expand one row, it doesn't affect the others. Plus, orders only get loaded when you actually need them.

## API Design - Split It Up

I split the API into two main endpoints instead of trying to cram everything into one:

**Customer list**: [`GET /api/customers`](backend/routes/customers.js:6-25)
- Just the customer info with pagination and sorting
- No nested order data to keep it fast

**Customer orders**: [`GET /api/customers/:id/orders`](backend/routes/customers.js:27-32)
- Loads order details only when you expand a row
- Keeps the initial page load snappy

This was actually a lesson learned from a previous project where I tried to load everything at once and the initial page load was painfully slow. Now I'm a big fan of lazy loading data.

Benefits I noticed:
- Way faster initial load
- Less memory usage (collapsed rows don't hold order data)
- Easier to cache different types of data separately
- Backend can optimize each endpoint differently

## The Biggest Challenge - Nested Inline Editing

This was definitely the trickiest part. I needed to handle editing at multiple levels:
- Customer status editing
- Order item size editing (nested inside expanded rows)

The complexity came from managing state across this hierarchy:
```
CustomerTable → CustomerRow → OrdersTable → InlineSizeEditor
```

### How I solved it

Each editing component manages its own state independently. The [`InlineSizeEditor`](frontend/src/app/components/InlineSizeEditor.jsx:13-14) looks like this:

```javascript
const [editing, setEditing] = useState(false);
const [size, setSize] = useState(item.customSize);
```

Key decisions that made this work:
1. **Optimistic updates** - UI updates immediately, API call happens in background
2. **Cancel functionality** - [`handleCancel`](frontend/src/app/components/InlineSizeEditor.jsx:29-32) restores original values if something goes wrong
3. **Input validation** - Size constraints prevent invalid values
4. **Independent state** - Each editor doesn't know or care about others

The hardest part was getting the data flow right. I went through a few iterations where editing one item would mess up others, or the state would get out of sync. The solution was keeping each editor completely isolated.

## What I'd Do Differently

If I had more time (or was building this for production), I'd probably implement a proper state management solution. Not because the current approach is wrong, but because it would make adding features easier.

### React Context + useReducer

I'd set up something like:

```javascript
const CustomerContext = createContext();

const customerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CUSTOMERS':
    case 'UPDATE_FILTERS':
    case 'TOGGLE_ROW_EXPANSION':
    case 'UPDATE_CUSTOMER_STATUS':
    case 'UPDATE_ORDER_ITEM_SIZE':
    // ... other actions
  }
};
```

Why this would be better:
- **Predictable state changes** - Everything goes through the reducer
- **Easier debugging** - Could hook up Redux DevTools
- **Better for teams** - More structured approach
- **Undo/redo support** - Would be straightforward to add
- **Bulk operations** - Could easily add "select all" type features

### Migration strategy

I'd probably do it gradually:
1. Add context alongside existing state
2. Move components over one by one
3. Add the fancy features (undo, bulk edit, etc.)
4. Clean up the old local state

## Lessons Learned

1. **Start simple** - Local state was perfect for getting this working quickly
2. **Lazy loading is your friend** - Don't load data until you need it
3. **Isolated state is easier to debug** - Each component managing its own state made troubleshooting much easier
4. **Optimistic updates feel fast** - Update the UI immediately, sync with server later

The current setup works well for what it is - a focused dashboard with moderate complexity. It's maintainable, performs well, and was quick to build. Sometimes that's exactly what you need.