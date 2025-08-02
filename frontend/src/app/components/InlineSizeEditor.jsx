"use client";
import { useState } from "react";

export default function InlineSizeEditor({ item }) {
  const [editing, setEditing] = useState(false);
  const [size, setSize] = useState(item.customSize);

  return editing ? (
    <div className="flex gap-1">
      {["chest", "waist", "hips"].map((key) => (
        <input
          key={key}
          type="number"
          value={size[key]}
          onChange={(e) => setSize({ ...size, [key]: e.target.value })}
          className="border px-1 w-14"
        />
      ))}
      <button onClick={() => {
        console.log("New size:", { orderId: item.orderId, orderItemId: item.orderItemId, size });
        setEditing(false);
      }}>Save</button>
      <button onClick={() => setEditing(false)}>Cancel</button>
    </div>
  ) : (
    <button onClick={() => setEditing(true)}>
      Size (C/W/H): {size.chest}/{size.waist}/{size.hips} [Edit]
    </button>
  );
}
