"use client";
import { useState } from "react";
import {
  Select,
  MenuItem,
  Button,
  Box,
  FormControl
} from '@mui/material';
import { Check, Close } from '@mui/icons-material';

export default function InlineStatusEditor({ status, onSave, onCancel }) {
  const [newStatus, setNewStatus] = useState(status);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <Select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          variant="outlined"
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="churned">Churned</MenuItem>
          <MenuItem value="prospect">Prospect</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        size="small"
        color="success"
        onClick={() => onSave(newStatus)}
        startIcon={<Check />}
        sx={{ minWidth: 'auto', px: 1 }}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        size="small"
        color="error"
        onClick={onCancel}
        startIcon={<Close />}
        sx={{ minWidth: 'auto', px: 1 }}
      >
        Cancel
      </Button>
    </Box>
  );
}
