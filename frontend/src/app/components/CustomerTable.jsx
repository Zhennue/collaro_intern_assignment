"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  TableSortLabel,
  Pagination,
  Stack,
  CircularProgress
} from '@mui/material';
import { fetchCustomers } from "../lib/api";
import CustomerRow from "./CustomerRow";

export default function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCustomers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { customers, total, error } = await fetchCustomers(page, limit, sortBy, order);
        
        if (error) {
          setError(error);
          setCustomers([]);
          setTotal(0);
        } else {
          setCustomers(customers);
          setTotal(total);
        }
      } catch (err) {
        setError('Failed to load customers');
        setCustomers([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, [page, limit, sortBy, order]);

  const handleSort = (column) => {
    const isAsc = sortBy === column && order === 'asc';
    setSortBy(column);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(total / limit);

  if (loading) {
    return (
      <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', p: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress size={40} />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Loading customers...
          </Typography>
        </Box>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', p: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" minHeight={200} justifyContent="center">
          <Typography variant="h6" color="error" gutterBottom>
            Unable to load customers
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" mb={2}>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{ textTransform: 'none' }}
          >
            Retry
          </Button>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 60 }}>
                Expand
              </TableCell>
              {[
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'status', label: 'Status' },
                { key: 'orderCount', label: 'Order Count' },
                { key: 'revenue', label: 'Revenue' }
              ].map((column) => (
                <TableCell key={column.key}>
                  <TableSortLabel
                    active={sortBy === column.key}
                    direction={sortBy === column.key ? order : 'asc'}
                    onClick={() => handleSort(column.key)}
                    sx={{
                      color: 'white !important',
                      '& .MuiTableSortLabel-icon': {
                        color: '#fbbf24 !important'
                      }
                    }}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No customers found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer, index) => (
                <CustomerRow key={customer.id} customer={customer} index={index} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 2,
          backgroundColor: 'grey.50'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} customers
        </Typography>
        
        <Stack direction="row" spacing={2} alignItems="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Stack>
      </Box>
    </Paper>
  );
}
