import { BrowserRouter, Routes, Route } from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import LogsPage from "./pages/LogsPage";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />

        <main className="main">
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/logs" element={<LogsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
