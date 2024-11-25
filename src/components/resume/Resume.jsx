import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Resume = () => {
  const [resumeData, setResumeData] = useState({
    education: [],
    experience: [],
    skills: [],
  });

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const docRef = doc(db, "content", "resume");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setResumeData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching Resume data:", error);
      }
    };

    fetchResumeData();
  }, []);

  const { education, experience, skills } = resumeData;

  return (
    <article className="resume active" data-page="resume">
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      {/* Education Section */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="book-outline"></ion-icon>
          </div>
          <h3 className="h3">Education</h3>
        </div>
        <ol className="timeline-list">
          {education.map((edu, index) => (
            <li className="timeline-item" key={index}>
              <h4 className="h4 timeline-item-title">{edu.title}</h4>
              <span>{edu.degree}</span>
              <span>{edu.date}</span>
              <p className="timeline-text">{edu.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Experience Section */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="briefcase-outline"></ion-icon>
          </div>
          <h3 className="h3">Experience</h3>
        </div>
        <ol className="timeline-list">
          {experience.map((exp, index) => (
            <li className="timeline-item" key={index}>
              <h4 className="h4 timeline-item-title">{exp.title}</h4>
              <span>{exp.date}</span>
              {/* التحقق من أن exp.tasks هو مصفوفة قبل استخدام .map */}
              {Array.isArray(exp.tasks) &&
                exp.tasks.map((task, taskIndex) => (
                  <p className="timeline-text" key={taskIndex}>
                    {task}
                  </p>
                ))}
            </li>
          ))}
        </ol>
      </section>

      {/* Skills Section */}
      <section className="skill">
        <h3 className="h3 skills-title">My Skills</h3>
        <ul className="skills-list content-card">
          {skills.map((skill, index) => (
            <li className="skills-item" key={index}>
              <div className="title-wrapper">
                <h5 className="h5">{skill.name}</h5>
                <data value={skill.proficiency}>{skill.proficiency}%</data>
              </div>
              <div className="skill-progress-bg">
                <div
                  className="skill-progress-fill"
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default Resume;
