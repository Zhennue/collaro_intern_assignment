"use client";
import { useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Avatar,
  Typography,
  Chip,
  Button,
  Box,
  Collapse,
  CircularProgress,
  Stack
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { fetchOrders } from "../lib/api";
import OrdersTable from "./OrdersTable";
import InlineStatusEditor from "./InlineStatusEditor";

export default function CustomerRow({ customer, index }) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [editingStatus, setEditingStatus] = useState(false);
  const [ordersError, setOrdersError] = useState(null);

  const toggleExpand = async () => {
    if (!expanded) {
      setLoading(true);
      setOrdersError(null);
      
      try {
        const data = await fetchOrders(customer.id);
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
          setOrdersError('Failed to load orders');
        }
      } catch (error) {
        setOrders([]);
        setOrdersError('Backend server is not running');
      } finally {
        setLoading(false);
      }
    }
    setExpanded(!expanded);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'success';
      case 'churned':
        return 'error';
      case 'prospect':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <>
      <TableRow hover>
        <TableCell>
          <IconButton
            onClick={toggleExpand}
            size="small"
            color="primary"
          >
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                mr: 2,
                width: 40,
                height: 40
              }}
            >
              {customer.name?.charAt(0)?.toUpperCase()}
            </Avatar>
            <Typography variant="body2" fontWeight="medium">
              {customer.name}
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          <Typography variant="body2" color="text.secondary">
            {customer.email}
          </Typography>
        </TableCell>
        <TableCell>
          {editingStatus ? (
            <InlineStatusEditor
              status={customer.status}
              onSave={(newStatus) => {
                console.log("New status:", newStatus);
                setEditingStatus(false);
              }}
              onCancel={() => setEditingStatus(false)}
            />
          ) : (
            <Chip
              label={customer.status}
              color={getStatusColor(customer.status)}
              size="small"
              variant="outlined"
            />
          )}
        </TableCell>
        <TableCell>
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{
                bgcolor: 'info.light',
                width: 32,
                height: 32,
                mr: 1,
                fontSize: '0.75rem'
              }}
            >
              {customer.orderCount}
            </Avatar>
            <Typography variant="body2" color="text.secondary">
              orders
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          <Typography variant="body2" fontWeight="semibold" color="success.main">
            ${customer.revenue?.toLocaleString()}
          </Typography>
        </TableCell>
        <TableCell>
          <Button
            variant="contained"
            size="small"
            onClick={() => setEditingStatus(true)}
            sx={{ textTransform: 'none' }}
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={7} sx={{ py: 0 }}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{ py: 2 }}>
              {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                  <CircularProgress size={32} />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                    Loading orders...
                  </Typography>
                </Box>
              ) : ordersError ? (
                <Box display="flex" flexDirection="column" alignItems="center" py={4}>
                  <Typography variant="body2" color="error" gutterBottom>
                    {ordersError}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={toggleExpand}
                    sx={{ textTransform: 'none', mt: 1 }}
                  >
                    Retry
                  </Button>
                </Box>
              ) : (
                <Box sx={{ backgroundColor: 'grey.50', borderRadius: 2, p: 2 }}>
                  <OrdersTable orders={orders} />
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
