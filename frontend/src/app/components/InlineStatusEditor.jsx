"use client";
import { useState } from "react";

export default function InlineStatusEditor({ status, onSave, onCancel }) {
  const [newStatus, setNewStatus] = useState(status);

  return (
    <div className="flex items-center gap-2">
      <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
        <option value="active">Active</option>
        <option value="churned">Churned</option>
        <option value="prospect">Prospect</option>
      </select>
      <button onClick={() => onSave(newStatus)}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
