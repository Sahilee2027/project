import React, { useState } from "react";
import "./Modal.css";

export default function Modal({
  title,
  defaultTitle = "",
  defaultDescription = "",
  onSave,
  onClose,
}) {
  const [t, setT] = useState(defaultTitle);
  const [d, setD] = useState(defaultDescription);

  return (
    <div className="modal-bg">
      <div className="modal-card">

        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="modal-body">
          <label>Title</label>
          <input
            value={t}
            maxLength={100}
            placeholder="e.g Plan sprint backlog"
            onChange={(e) => setT(e.target.value)}
          />

          <label>Description</label>
          <textarea
            value={d}
            maxLength={500}
            placeholder="Add scope, owners, and due dates"
            onChange={(e) => setD(e.target.value)}
          ></textarea>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={() => onSave(t, d)}>Save</button>
        </div>

      </div>
    </div>
  );
}
