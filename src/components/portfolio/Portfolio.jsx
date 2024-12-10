import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import ProjectItem from "./ProjectItem";
import "../../App.css";

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [activeSlide, setActiveSlide] = useState({});

  const [loading, setLoading] = useState(true);
  const [activeIframe, setActiveIframe] = useState(null);

  // دالة showIframe لتغيير حالة activeIframe
  const showIframe = (iframeId) => {
    setActiveIframe(iframeId);
  };

  const hideIframe = () => {
    setActiveIframe(null);
  };

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
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
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
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <article className="portfolio active" data-page="portfolio">
        <header>
          <h2 className="h2 article-title">Portfolio</h2>
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
                  showIframe={showIframe} // تمرير دالة showIframe
                  hideIframe={hideIframe} // تمرير دالة hideIframe
                  activeIframe={activeIframe} // تمرير قيمة activeIframe
                />
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}

export default Portfolio;
