import playIcon from "../../assets/Images/icons8-play-100.png";
import frame from "../../assets/Images/iphone-frame.png";
import gitHubIcon from "../../assets/Images/icons8-github.svg";
import closeIcon from "../../assets/Images/close-button.png";
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
        <div className="play-icon" onClick={() => showIframe(`iframe${index}`)}>
          <img src={playIcon} alt="Play Icon" />
        </div>
        {activeIframe === `iframe${index}` && (
          <div id={`iframe${index}`} className="iframe-container">
            <iframe
              className="video"
              src={project.videoLink}
              width="200"
              height="480"
              allow="autoplay; encrypted-media"
              frameBorder="0"
            ></iframe>
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
    </li>
  );
}

export default ProjectItem;
