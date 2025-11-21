import React, { useEffect, useState } from "react";
import api from "../api";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const [createModal, setCreateModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await api.get(
        `/tasks?page=${page}&limit=${limit}&search=${search}`
      );
      setTasks(res.data?.data || []);
      setTotal(res.data?.total || 0);
    } catch (err) {
      alert("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, search]);

  const createTask = async (title, desc) => {
    if (!title.trim() || !desc.trim()) return alert("Fields required");

    await api.post("/tasks", { title, description: desc });
    setCreateModal(false);
    fetchTasks();
  };

  const updateTask = async (id, title, desc) => {
    if (!title.trim() || !desc.trim()) return alert("Fields required");

    await api.put(`/tasks/${id}`, { title, description: desc });
    setEditData(null);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete task?")) return;
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="main">
      <h1>Tasks</h1>

      {/* SEARCH + CREATE BUTTON ROW */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        {/* Search */}
        <input
          className="search-input"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "250px" }}
        />

        {/* Create Task Button */}
        <button className="btn btn-green" onClick={() => setCreateModal(true)}>
          Create Task
        </button>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((t) => (
              <tr key={t._id}>
                <td>{t._id}</td>
                <td>{t.title}</td>
                <td>{t.description}</td>
                <td>{new Date(t.createdAt).toLocaleString()}</td>

                {/* UPDATE + DELETE BUTTONS */}
                <td>
                  <button
                    className="btn-edit"
                    style={{ marginRight: 10 }}
                    onClick={() => setEditData(t)}
                  >
                    Update
                  </button>

                  <button
                    className="btn-danger"
                    onClick={() => deleteTask(t._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination page={page} limit={limit} total={total} setPage={setPage} />

      {/* CREATE MODAL */}
      {createModal && (
        <Modal
          title="Create Task"
          onClose={() => setCreateModal(false)}
          onSave={createTask}
        />
      )}

      {/* UPDATE MODAL */}
      {editData && (
        <Modal
          title="Update Task"
          defaultTitle={editData.title}
          defaultDescription={editData.description}
          onClose={() => setEditData(null)}
          onSave={(t, d) => updateTask(editData._id, t, d)}
        />
      )}
    </div>
  );
}
