# Design Choices Document

## 1. State Management Architecture

### Complex State Management for Main Table (Filters, Sorting)

The application employs a **local component state** approach using React's `useState` hooks for managing the main table's complex state. This design choice was made for several key reasons:

**State Structure in [`CustomerTable.jsx`](frontend/src/app/components/CustomerTable.jsx:23-30):**
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

**Benefits of This Approach:**
- **Simplicity**: For a dashboard with moderate complexity, local state provides the most straightforward implementation
- **Performance**: Direct state updates trigger efficient re-renders only for affected components
- **Maintainability**: State logic is co-located with the component that uses it, making it easier to understand and debug
- **Server-Side Synchronization**: The state automatically syncs with backend through the [`useEffect`](frontend/src/app/components/CustomerTable.jsx:32-58) dependency array `[page, limit, sortBy, order]`

### Individual Row States (Expanded, Loading, Editing)

Each customer row manages its own state independently through the [`CustomerRow`](frontend/src/app/components/CustomerRow.jsx:21-26) component:

```javascript
const [expanded, setExpanded] = useState(false);
const [loading, setLoading] = useState(false);
const [orders, setOrders] = useState([]);
const [editingStatus, setEditingStatus] = useState(false);
const [ordersError, setOrdersError] = useState(null);
```

**Design Rationale:**
- **Isolation**: Each row's state is independent, preventing cascading updates
- **Lazy Loading**: Orders are only fetched when a row is expanded, optimizing performance
- **Granular Control**: Individual rows can be in different states (some expanded, some loading, some editing)
- **Memory Efficiency**: Collapsed rows don't maintain order data in memory

## 2. API Design Philosophy

### Separation of Customer and Order Endpoints

The API follows a **resource-based RESTful design** with clear separation between customer and order endpoints:

**Customer Endpoint:** [`GET /api/customers`](backend/routes/customers.js:6-25)
- Handles pagination, sorting, and filtering
- Returns customer summaries without nested order data
- Optimized for table display performance

**Order Endpoint:** [`GET /api/customers/:id/orders`](backend/routes/customers.js:27-32)
- Fetches detailed order data for a specific customer
- Loaded on-demand when customer row is expanded

### Benefits of This Approach

1. **Performance Optimization**
   - Initial page load only fetches customer summaries
   - Order data is loaded lazily, reducing initial payload size
   - Prevents over-fetching of data that may never be viewed

2. **Scalability**
   - Separate endpoints can be optimized independently
   - Customer endpoint can implement efficient pagination
   - Order endpoint can handle complex nested data structures

3. **Caching Strategy**
   - Customer list can be cached at the application level
   - Order data can be cached per customer ID
   - Different cache invalidation strategies for different data types

4. **Network Efficiency**
   - Reduces bandwidth usage by fetching only necessary data
   - Enables progressive data loading based on user interaction
   - Supports better error handling for different data types

5. **Backend Flexibility**
   - Each endpoint can have different authentication/authorization rules
   - Allows for different data sources (customers from one DB, orders from another)
   - Enables microservices architecture in the future

## 3. Biggest Technical Challenge: Nested Inline Editing

### The Challenge

The most complex technical challenge was implementing **nested inline editing** for order item sizes within the expandable customer rows. This involved:

- Managing editing state at multiple levels (customer → order → order item)
- Handling complex nested data structures with custom size objects
- Maintaining UI consistency across different editing contexts
- Ensuring data integrity during concurrent edits

### The Solution

**Multi-Level State Management:**

1. **Customer Level** ([`CustomerRow.jsx`](frontend/src/app/components/CustomerRow.jsx:25)): 
   ```javascript
   const [editingStatus, setEditingStatus] = useState(false);
   ```

2. **Order Item Level** ([`InlineSizeEditor.jsx`](frontend/src/app/components/InlineSizeEditor.jsx:13-14)):
   ```javascript
   const [editing, setEditing] = useState(false);
   const [size, setSize] = useState(item.customSize);
   ```

**Key Technical Solutions:**

1. **Component Isolation**: Each [`InlineSizeEditor`](frontend/src/app/components/InlineSizeEditor.jsx) manages its own editing state independently
2. **Optimistic Updates**: Local state updates immediately while API calls happen in background
3. **Rollback Mechanism**: [`handleCancel`](frontend/src/app/components/InlineSizeEditor.jsx:29-32) function restores original values
4. **Validation**: Input constraints prevent invalid size values ([`inputProps={{ min: 0, max: 60 }}`](frontend/src/app/components/InlineSizeEditor.jsx:46))

**Data Flow Architecture:**
```
CustomerTable → CustomerRow → OrdersTable → InlineSizeEditor
     ↓              ↓             ↓              ↓
  Pagination    Expansion    Display Items   Edit Sizes
```

**Error Handling Strategy:**
- Graceful degradation when backend is unavailable
- User-friendly error messages with retry options
- Consistent loading states across all editing interfaces

## 4. Next Priority: Advanced State Management Refactor

### If I Had Another Day: Implement Context-Based State Management

**The Feature: Global State Management with React Context**

I would prioritize implementing a **React Context + useReducer** pattern to replace the current local state management approach.

### Why This Refactor?

1. **Scalability Concerns**
   - Current local state approach doesn't scale well with additional features
   - Adding filters, search, or bulk operations would require prop drilling
   - State synchronization between components becomes complex

2. **User Experience Improvements**
   - Preserve user's table state (sorting, pagination) when navigating
   - Implement optimistic updates for better perceived performance
   - Add undo/redo functionality for editing operations

3. **Developer Experience**
   - Centralized state logic makes debugging easier
   - Consistent state management patterns across components
   - Better testability with predictable state transitions

### Implementation Plan

**Context Structure:**
```javascript
// CustomerContext.js
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

**Benefits:**
- **Predictable State Updates**: All state changes go through the reducer
- **Time-Travel Debugging**: Easy to implement with Redux DevTools
- **Optimistic Updates**: Update UI immediately, sync with server later
- **Offline Support**: Queue actions when offline, sync when online
- **Performance**: Selective re-rendering with context selectors

**Migration Strategy:**
1. Implement context alongside existing local state
2. Gradually migrate components one by one
3. Add advanced features (undo/redo, bulk operations)
4. Remove old local state management

This refactor would transform the application from a simple dashboard into a robust, enterprise-ready customer management system with advanced state management capabilities.

---

## Summary

The current architecture prioritizes **simplicity and maintainability** over complex state management solutions. The design choices reflect a pragmatic approach suitable for the current scope while providing a solid foundation for future enhancements. The separation of concerns between API endpoints, component-level state management, and progressive data loading creates a scalable and performant user experience.