import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "../../App.css";
import icon1 from "../../assets/Images/icon-design.svg";
import icon2 from "../../assets/Images/download.svg";
function About() {
  const [aboutContent, setAboutContent] = useState([]);

  // جلب البيانات من Firebase عند تحميل الصفحة
  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const docRef = doc(db, "content", "about");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const content = docSnap.data().content;
          // تقسيم النصوص إلى فقرات بناءً على السطر الجديد (\n)
          const paragraphs = content
            .split("\n")
            .filter((paragraph) => paragraph.trim() !== "");
          setAboutContent(paragraphs);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching About content:", error);
      }
    };

    fetchAboutContent();
  }, []);
  return (
    <article className="about active" data-page="about">
      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>

      <section className="about-text">
        {/* عرض النصوص كمجموعة من الفقرات */}
        {aboutContent.length > 0 ? (
          aboutContent.map((paragraph, index) => <p key={index}>{paragraph}</p>)
        ) : (
          <p>Loading content...</p>
        )}
      </section>

      <section className="service">
        <h3 className="h3 service-title">What I'm doing</h3>

        <ul className="service-list">
          <li className="service-item">
            <div className="service-icon-box">
              <img src={icon1} alt="design icon" width="40" />
            </div>

            <div className="service-content-box">
              <h4 className="h4 service-item-title">Mobile App Design</h4>

              <p className="service-item-text">
                The most modern and high-quality design made at a professional
                level.
              </p>
            </div>
          </li>

          <li className="service-item">
            <div className="service-icon-box">
              <img src={icon2} alt="Web development icon" width="40" />
            </div>

            <div className="service-content-box">
              <h4 className="h4 service-item-title">Mobile App Development</h4>

              <p className="service-item-text">
                High-quality development of iOS Apps at the professional level.
              </p>
            </div>
          </li>
        </ul>
      </section>
    </article>
  );
}

export default About;
