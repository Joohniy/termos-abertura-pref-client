import { useState } from "react";
import "./sidebar.css"
export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
    <button className="toggle-button" onClick={toggleSidebar}>
      ☰
    </button>
    <ul className="menu">
      <li><a href="/abertura" >Abertura com letras</a></li>
      <li><a href="/abertura/semletras">Abertura sem letras</a></li>
    </ul>
  </div>
    );
  }