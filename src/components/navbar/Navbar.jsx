import { useState } from "react";
import "../../App.css";

function Navbar({ onNavigate }) {
  const [activePage, setActivePage] = useState("about"); // الحالة النشطة

  const handleNavigation = (page) => {
    setActivePage(page); // تحديث الصفحة النشطة
    onNavigate(page); // تمرير الصفحة إلى المكون الرئيسي
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {["about", "resume", "portfolio", "services"].map((page, index) => (
          <li key={index} className="navbar-item">
            <button
              className={`navbar-link ${activePage === page ? "active" : ""}`}
              onClick={() => handleNavigation(page)}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
