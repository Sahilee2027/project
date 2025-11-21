import React from "react";

export default function Pagination({ page, limit, total, setPage }) {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div style={{ marginTop: 20 }}>
      <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
        Prev
      </button>

      <span style={{ margin: "0 10px" }}>
        Page {page} of {totalPages}
      </span>

      <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
}
