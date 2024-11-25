import { useEffect } from "react";

import AhmedImage from "../../assets/images/ahmed.jpeg";
import '../../App.css';

const Sidebar = () => {
  useEffect(() => {
    // element toggle function
    const elementToggleFunc = (elem) => {
      elem.classList.toggle("active");
    };

    // sidebar variables
    const sidebar = document.querySelector("[data-sidebar]");
    const sidebarBtn = document.querySelector("[data-sidebar-btn]");

    // sidebar toggle functionality for mobile
    const handleSidebarToggle = () => {
      elementToggleFunc(sidebar);
    };

    sidebarBtn.addEventListener("click", handleSidebarToggle);

    // Clean up the event listener on component unmount
    return () => {
      sidebarBtn.removeEventListener("click", handleSidebarToggle);
    };
  }, []);
  return (
    <aside className="sidebar" data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img src={AhmedImage} alt="Ahmed Adel" width="80" />
        </figure>

        <div className="info-content">
          <h1 id="name1" className="name" title="AhmedAdel">
            Ahmed Adel Hamza
          </h1>
          <p className="title">iOS Engineer</p>
        </div>

        <button className="info_more-btn" data-sidebar-btn>
          <span>Show Contacts</span>
          <ion-icon name="chevron-down"></ion-icon>
        </button>
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>
        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="mail-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Email</p>
              <a
                href="mailto:ahmedadel.2003816@gmail.com"
                className="contact-link"
                title="ahmedadel.2003816@gmail.com"
              >
                ahmedadel.2003816@gmail.com
              </a>
            </div>
          </li>
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="phone-portrait-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a href="tel:+20 1120100709" className="contact-link">
                (+20) 01120100709
              </a>
            </div>
          </li>
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="calendar-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">My date of birth</p>
              <time dateTime="2003-08-16">August 16, 2003</time>
            </div>
          </li>
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="location-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address>
                Cairo, Egypt <br />
              </address>
            </div>
          </li>
        </ul>

        <div className="separator"></div>
        <ul className="social-list">
          <li className="social-item">
            <a
              href="https://www.linkedin.com/in/ahmed-adel-927323264"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <ion-icon className="linkedin" name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a
              href="https://github.com/iahmedadel"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <ion-icon className="github" name="logo-github"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a
              href="https://stackoverflow.com/users/28227106/ahmed-adel"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <ion-icon name="logo-stackoverflow"></ion-icon>
            </a>
          </li>
        </ul>
      </div>

      <div className="footer">
        <p>
          Copyright &copy; {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
