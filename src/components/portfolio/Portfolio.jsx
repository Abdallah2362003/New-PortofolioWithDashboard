import { useState, useEffect } from "react";
import { collection, onSnapshot} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import ProjectItem from "./ProjectItem";
import "../../App.css";
import Dashboard from "../Dashboard/Dashboard";
import addIcon from "../../assets/Images/add-icon.png";

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [activeSlide, setActiveSlide] = useState({});
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const changeSlide = (projectIndex, direction) => {
    setActiveSlide((prev) => {
      const currentSlide = prev[projectIndex] || 0;
      const totalSlides = projects[projectIndex]?.images.length || 0;
      let newSlide = currentSlide + direction;

      if (newSlide >= totalSlides) {
        newSlide = 0;
      } else if (newSlide < 0) {
        newSlide = totalSlides - 1;
      }

      return { ...prev, [projectIndex]: newSlide };
    });
  };

  // Fetch projects from Firestore in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        const projectList = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => a.order - b.order); // ترتيب المشاريع حسب الخاصية "order"
        setProjects(projectList);

        const initialSlides = {};
        projectList.forEach((_, index) => {
          initialSlides[index] = 0;
        });
        setActiveSlide(initialSlides);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);


  const toggleDashboard = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = () => {
    const correctPassword = import.meta.env.VITE_DASHBOARD_PASSWORD;
    if (passwordInput === correctPassword) {
      setIsDashboardOpen(true);
      setShowPasswordModal(false);
      setPasswordInput("");
      setErrorMessage("");
    } else {
      setErrorMessage("Incorrect password. Please try again.");
    }
  };

  return (
    <>
      <article className="portfolio active" data-page="portfolio">
        <header>
          <h2 className="h2 article-title">Portfolio</h2>
          <button onClick={toggleDashboard} className="add-project-btn">
            <img src={addIcon} alt="Add Icon" />
          </button>
        </header>

        {loading ? (
          <div className="loader-container">
            <div className="loader1"></div>
          </div>
        ) : (
          <section className="projects">
            <ul className="project-list">
              {projects.map((project, index) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  index={index}
                  activeSlide={activeSlide}
                  changeSlide={changeSlide}
                />
              ))}
            </ul>
          </section>
        )}
      </article>


      {showPasswordModal && (
        <div className="password-modal">
          <div className="modal-content">
            <h1 className="title">Enter Password</h1>
            <h4 className="title1">This Page For Admin Only</h4>
            <input
              type="password"
              placeholder="Enter password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <div className="pass-btn">
              <button className="submit" onClick={handlePasswordSubmit}>
                Submit
              </button>
              <button
                className="cancel"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isDashboardOpen && (
        <div className="dashboard-modal">
          <div className="modal-content">
            <button
              onClick={() => setIsDashboardOpen(false)}
              className="close-modal-btn"
              style={{ color: "white" }}
            >
              x
            </button>
            <Dashboard />
          </div>
        </div>
      )}
    </>
  );
}

export default Portfolio;
