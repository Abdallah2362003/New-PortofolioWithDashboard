import { useState } from "react";
import About from "./components/about/About";
import Resume from "./components/resume/Resume";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";
import Portfolio from "./components/portfolio/Portfolio";
import Service from "./components/service/Service";

function App() {
  const [currentPage, setCurrentPage] = useState("about");

  const renderPage = () => {
    switch (currentPage) {
      case "about":
        return <About />;
      case "resume":
        return <Resume />;
        case "portfolio":
            return <Portfolio />;
        case "services":
            return <Service />;
      default:
        return <About />;
    }
  };

  return (
    <main>
      <Sidebar />
      <div className="main-content">
        {renderPage()} {/* عرض الصفحة النشطة */}
        <Navbar onNavigate={setCurrentPage} />
      </div>
    </main>
  );
}

export default App;
