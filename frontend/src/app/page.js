"use client";
import { Container, Typography, Box } from '@mui/material';
import CustomerTable from "./components/CustomerTable";

export default function Home() {
  return (
    <Box className="dashboard-background">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: 'white',
              fontWeight: 700,
              mb: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Customer Dashboard
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 400
            }}
          >
            Manage your customers and track their orders
          </Typography>
        </Box>
        <CustomerTable />
      </Container>
    </Box>
  );
}