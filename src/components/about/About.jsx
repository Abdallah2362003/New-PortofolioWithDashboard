import '../../App.css'
import icon1 from '../../assets/Images/icon-design.svg'
import icon2 from '../../assets/Images/download.svg'
function About() {
  return (
    <article className="about active" data-page="about">
  <header>
    <h2 className="h2 article-title">About me</h2>
  </header>

  <section className="about-text">
    <p>
      I'm an iOS developer with a focus on building high-quality,
      user-centered applications in iOS. With a strong foundation in
      software engineering and experience working across diverse
      projects, including chat apps, speedo transfer, and metro
      ticketing systems, I bring a balance of technical expertise and
      creative problem solving to my work.
    </p>
    <p>
      I specialize in creating seamless, visually appealing, and
      efficient mobile applications using tools such as UIKit, Swift UI,
      Swift, and Firebase. I prioritize maintaining clean, scalable code
      and am well versed in industry standard design patterns
      principles. My recent projects range from developing a ticketing
      app with QR integration for real-time payments to implementing
      secure, scalable chat applications with friend management
      features.
    </p>
    <p>
      In addition to development, I am a Technical Content Creator on YouTube,
      explaining computer science courses and making tech podcasts.
    </p>
    <p>
      I am always open to new challenges and opportunities to innovate,
      especially in mobile applications that make life easier, more
      connected, and more efficient. Whether working in a team or
      independently, I aim to deliver high-quality products that exceed
      user expectations.
    </p>
  </section>

  <section className="service">
    <h3 className="h3 service-title">What I'm doing</h3>

    <ul className="service-list">
      <li className="service-item">
        <div className="service-icon-box">
          <img
            src={icon1}
            alt="design icon"
            width="40"
          />
        </div>

        <div className="service-content-box">
          <h4 className="h4 service-item-title">Mobile App Design</h4>

          <p className="service-item-text">
            The most modern and high-quality design made at a
            professional level.
          </p>
        </div>
      </li>

      <li className="service-item">
        <div className="service-icon-box">
          <img
            src={icon2}
            alt="Web development icon"
            width="40"
          />
        </div>

        <div className="service-content-box">
          <h4 className="h4 service-item-title">Mobile App Development</h4>

          <p className="service-item-text">
            High-quality development of iOS Apps at the professional
            level.
          </p>
        </div>
      </li>
    </ul>
  </section>
</article>
  )
}

export default About
