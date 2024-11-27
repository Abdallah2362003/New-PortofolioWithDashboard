import { useState } from "react";
import playIcon from "../../assets/Images/icons8-play-100.png";
import frame from "../../assets/Images/iphone-frame.png";
import gitHubIcon from "../../assets/Images/icons8-github.svg";
import closeIcon from "../../assets/Images/close-button.png";
import SnackbarAlert from "../Dashboard/SnackbarAlert";
import "../../App.css";

function ProjectItem({
  project,
  index,
  activeSlide,
  changeSlide,
  showIframe,
  hideIframe,
  activeIframe,
}) {
  const [showSnackbar, setShowSnackbar] = useState(false); // حالة لعرض الـ Snackbar

  // دالة لعرض الـ Snackbar عند الضغط على Play Icon
  const handlePlayIconClick = () => {
    setShowSnackbar(true); // إظهار الـ Snackbar

    // إخفاء الـ Snackbar بعد 3 ثواني
    setTimeout(() => {
      setShowSnackbar(false);
    }, 30000);
  };
  return (
    <li className="project-item active" key={project.id}>
      <div className="frame">
        <img className="frame-img" src={frame} alt="Frame" />
        <div className="git-hub">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={gitHubIcon} alt="GitHub Icon" />
          </a>
        </div>
        <div className="play-icon"  onClick={() => {
            handlePlayIconClick(); // تشغيل Snackbar
            showIframe(`iframe${index}`); // فتح الفيديو داخل iframe
          }}>
          <img src={playIcon} alt="Play Icon" />
        </div>
        {activeIframe === `iframe${index}` && (
          <div id={`iframe${index}`} className="iframe-container">
            <video
              className="video"
              width="100%"
              height="400"
              controls
              autoPlay
              loop
              preload="metadata"
            >
              <source src={project.videoLink} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="exit-icon" onClick={hideIframe}>
              <img src={closeIcon} alt="Close Icon" />
            </div>
          </div>
        )}
        <div className="slider">
          <figure className="project-img">
            {Array.isArray(project.images) &&
              project.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={image}
                  alt={`${project.title} Image ${imgIndex + 1}`}
                  className={`slide ${
                    activeSlide && activeSlide[index] === imgIndex
                      ? "active"
                      : ""
                  }`}
                />
              ))}
          </figure>
          <button className="prev" onClick={() => changeSlide(index, -1)}>
            &#10094;
          </button>
          <button className="next" onClick={() => changeSlide(index, 1)}>
            &#10095;
          </button>
        </div>
      </div>
      <h3 className="project-title">{project.title}</h3>
      {/* استخدام SnackbarAlert هنا */}
      <SnackbarAlert
        open={showSnackbar} // إظهار الـ Snackbar إذا كانت الحالة true
        onClose={() => setShowSnackbar(false)} // إغلاق الـ Snackbar
        message="For better experience, consider viewing in fullscreen." // الرسالة المعروضة
        severity="info" // نوع التنبيه
      />
    </li>
  );
}

export default ProjectItem;
