"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Avatar,
  Stack,
  Chip
} from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';
import InlineSizeEditor from "./InlineSizeEditor";

export default function OrdersTable({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        py={8}
      >
        <Avatar
          sx={{
            width: 64,
            height: 64,
            bgcolor: 'grey.100',
            mb: 2,
            fontSize: '2rem'
          }}
        >
          📦
        </Avatar>
        <Typography variant="body1" color="text.secondary">
          No orders found for this customer
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'grey.200' }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: 'grey.100' }}>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="semibold">
                Order ID
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="semibold">
                Order Date
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="semibold">
                Total Amount
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="semibold">
                Items
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={order.orderId} hover>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: 'info.light',
                      mr: 2,
                      fontSize: '0.75rem'
                    }}
                  >
                    #
                  </Avatar>
                  <Typography variant="body2" fontWeight="medium">
                    {order.orderId}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {new Date(order.orderDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="semibold" color="success.main">
                  ${order.totalAmount?.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell>
                <Stack spacing={1}>
                  {order.items.map((item) => (
                    <Box
                      key={item.orderItemId}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'grey.50',
                        borderRadius: 2,
                        p: 1.5,
                        border: '1px solid',
                        borderColor: 'grey.200'
                      }}
                    >
                      <Box display="flex" alignItems="center" flex={1}>
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            bgcolor: 'secondary.light',
                            mr: 1,
                            fontSize: '0.75rem'
                          }}
                        >
                          <ShoppingBag fontSize="small" />
                        </Avatar>
                        <Typography variant="body2" color="text.primary" sx={{ mr: 2 }}>
                          {item.itemName}
                        </Typography>
                        <Chip
                          label={`$${item.price}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                      <InlineSizeEditor item={item} />
                    </Box>
                  ))}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
