import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>

      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? "side-link active" : "side-link"}
      >
        Tasks
      </NavLink>

      <NavLink 
        to="/logs" 
        className={({ isActive }) => isActive ? "side-link active" : "side-link"}
      >
        Logs
      </NavLink>
    </div>
  );
}
