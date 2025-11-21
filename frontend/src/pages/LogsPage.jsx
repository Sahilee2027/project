import React, { useEffect, useState } from "react";
import api from "../api";
import Pagination from "../components/Pagination";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);

  const fetchLogs = async () => {
    try {
      const res = await api.get(`/logs?page=${page}&limit=${limit}`);

      setLogs(res.data?.data || []);
      setTotal(res.data?.total || 0);
    } catch (err) {
      alert("Failed to load logs");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page]);

  /** Map action → badge class */
  const actionBadge = (action) => {
    if (action.includes("Create")) return "badge badge-create";
    if (action.includes("Update")) return "badge badge-update";
    if (action.includes("Delete")) return "badge badge-delete";
    return "badge";
  };

  return (
    <div className="main">
      <h1>Audit Logs</h1>

      {/* TABLE */}
      <div className="table-container">
        <table className="log-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action</th>
              <th>Task ID</th>
              <th>Updated Content</th>
              <th>Notes</th>
            </tr>
          </thead>

          <tbody>
            {logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log._id}>
                  {/* TIMESTAMP */}
                  <td>
                    {log.timestamp
                      ? new Date(log.timestamp).toLocaleString()
                      : "—"}
                  </td>

                  {/* ACTION BADGE */}
                  <td>
                    <span className={actionBadge(log.action)}>
                      {log.action}
                    </span>
                  </td>

                  {/* TASK ID */}
                  <td>{log.taskId || "—"}</td>

                  {/* UPDATED CONTENT */}
                  <td className="updated-content">
                    {log.updatedContent ? (
                      Object.entries(log.updatedContent).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {value}
                        </div>
                      ))
                    ) : (
                      "—"
                    )}
                  </td>

                  {/* NOTES */}
                  <td>—</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: 15 }}>
                  No logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination page={page} limit={limit} total={total} setPage={setPage} />
    </div>
  );
}
