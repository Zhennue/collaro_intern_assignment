"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack
} from '@mui/material';
import { Edit, Check, Close } from '@mui/icons-material';

export default function InlineSizeEditor({ item }) {
  const [editing, setEditing] = useState(false);
  const [size, setSize] = useState(item.customSize);

  const handleSizeChange = (field, value) => {
    setSize({ ...size, [field]: parseInt(value) || 0 });
  };

  const handleSave = () => {
    console.log("New size:", { 
      orderId: item.orderId, 
      orderItemId: item.orderItemId, 
      size 
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setSize(item.customSize);
    setEditing(false);
  };

  return editing ? (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
        {["chest", "waist", "hips"].map((field) => (
          <TextField
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            type="number"
            value={size[field]}
            onChange={(e) => handleSizeChange(field, e.target.value)}
            size="small"
            sx={{ width: 80 }}
            inputProps={{ min: 0, max: 60 }}
          />
        ))}
      </Stack>
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={handleSave}
          startIcon={<Check />}
          sx={{ minWidth: 'auto', px: 1 }}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={handleCancel}
          startIcon={<Close />}
          sx={{ minWidth: 'auto', px: 1 }}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  ) : (
    <Button
      variant="text"
      size="small"
      onClick={() => setEditing(true)}
      startIcon={<Edit />}
      sx={{ 
        textTransform: 'none',
        color: 'text.secondary',
        '&:hover': {
          backgroundColor: 'action.hover'
        }
      }}
    >
      <Typography variant="caption">
        Size (C/W/H): {size.chest}/{size.waist}/{size.hips}
      </Typography>
    </Button>
  );
}
