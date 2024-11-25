import '../../App.css';

function Resume() {
    const education = [
        {
            title: "Bs of Computer Science, Modern Academy.",
            grade: "Overall Grade: Very Good with GPA 3.5",
            date: "2021 — 2025",
            description: `The Bachelor of Science in Computer Science program at Modern Academy provides a 
            comprehensive foundation in programming, data structures, algorithms, databases, networks, 
            software engineering, artificial intelligence, and cybersecurity. Students gain hands-on experience 
            through projects and internships, preparing them for careers in software development, data science, 
            cybersecurity, and other exciting fields in computer science.`,
        },
        {
            title: "Digital Egypt Pioneers Initiative (DEPI) 4 Months.",
            grade: "Mobile App Development Track (Flutter & Native Android)",
            date: "July 2024 — October 2024",
            description: `The DEPI Mobile App Development Track (Flutter & Native Android) provides comprehensive 
            training in Flutter and Android development. Participants learn to build cross-platform and native 
            mobile apps, design user interfaces, deploy apps on stores, and gain practical experience through 
            projects and mentorship.`,
        },
    ];

    const experience = [
        {
            title: "IOS Development Internship at ITI, Smart Village",
            date: "July 2024 – October 2024",
            tasks: [
                "Developed iOS applications using Swift and best practices in mobile app development.",
                "Worked with UI frameworks (UIKit, SwiftUI) and developed animations.",
                "Gained experience with RESTful API integration for data exchange between client and server.",
                "Worked with XCTest & Unit Testing and RX Swift.",
            ],
        },
        {
            title: "IOS Development Internship at Bank Misr",
            date: "July 2024 - August 2024",
            tasks: [
                "Developed iOS applications using Swift and best practices in mobile app development.",
                "Worked with frameworks UIKit.",
                "Worked with UserDefaults, Keychain, and Core Data for data storage and management.",
                "Worked with Cocoapods, Core Data, Networking, Architecture Patterns (MVC, MVP, MVVM).",
                "Unit Testing, Git, Agile Project Management.",
            ],
        },
        {
            title: "iOS Development Internship at The Sparks Foundation",
            date: "Sep 2023 - Oct 2023",
            tasks: [
                "Created many applications such as a basic bank app and social media.",
                "Worked with UI Kit Framework.",
                "Used MVVM and MVC to organize projects.",
            ],
        },
    ];

    const skills = [
        { name: "Swift", level: "100%" },
        { name: "Dart", level: "75%" },
        { name: "Java", level: "80%" },
        { name: "Python", level: "70%" },
        { name: "Prolog", level: "70%" },
        { name: "Kotlin", level: "70%" },
        { name: "C++", level: "85%" },
        { name: "C#", level: "60%" },
    ];

    return (
        <article className="resume active" data-page="resume">
            <header>
                <h2 className="h2 article-title">Resume</h2>
            </header>

            <section className="timeline">
                <div className="title-wrapper">
                    <div className="icon-box">
                        <ion-icon name="book-outline"></ion-icon>
                    </div>
                    <h3 className="h3">Education</h3>
                </div>
                <ol className="timeline-list">
                    {education.map((edu, index) => (
                        <li className="timeline-item" key={edu.title}>
                            <h4 className="h4 timeline-item -title">{edu.title}</h4>
                            <span>{edu.grade}</span>
                            <span>{edu.date}</span>
                            <p className="timeline-text">{edu.description}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="timeline">
                <div className="title-wrapper">
                    <div className="icon-box">
                        <ion-icon name="briefcase-outline"></ion-icon>
                    </div>
                    <h3 className="h3">Experience</h3>
                </div>
                <ol className="timeline-list">
                    {experience.map((exp) => (
                        <li className="timeline-item" key={exp.title}>
                            <h4 className="h4 timeline-item-title">{exp.title}</h4>
                            <span>{exp.date}</span>
                            {exp.tasks.map((task, taskIndex) => (
                                <p className="timeline-text" key={taskIndex}>
                                    {task}
                                </p>
                            ))}
                        </li>
                    ))}
                </ol>
            </section>

            <section className="skill">
                <h3 className="h3 skills-title">My Skills</h3>
                <ul className="skills-list content-card">
                    {skills.map((skill) => (
                        <li className="skills-item" key={skill.name}>
                            <div className="title-wrapper">
                                <h5 className="h5">{skill.name}</h5>
                                <data value={skill.level}>{skill.level}</data>
                            </div>
                            <div className="skill-progress-bg">
                                <div
                                    className="skill-progress-fill"
                                    style={{ width: skill.level }}
                                ></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
}

export default Resume;