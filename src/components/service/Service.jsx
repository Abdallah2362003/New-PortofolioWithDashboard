import interfaceIcon from "../../assets/Images/Service/interface-ui-ux-web-svgrepo-com.svg";
import Cloud from "../../assets/Images/Service/cloud-download-svgrepo-com.svg";
import maintenance from "../../assets/Images/Service/maintenance-documents-svgrepo-com.svg";
import mobile from "../../assets/Images/Service/mobile-app-developing-svgrepo-com.svg";
import CV from '../../assets/CV.pdf'
function Service() {
  return (
    <article className="services active" data-page="services">
      <header>
        <h2 className="h2 article-title">Services</h2>
      </header>

      <section className="service">
        <ul className="service-list">
          <li className="service-item">
            <div className="service-icon-box" aria-label="Mobile Development Icon">
              <img src={mobile} alt="Mobile App Development Icon" width="40" />
            </div>
            <div className="service-content-box">
              <h4 className="h4 service-item-title">App Development</h4>
              <p className="service-item-text">
                Build new apps or update existing ones.
              </p>
            </div>
          </li>

          <li className="service-item">
            <div className="service-icon-box" aria-label="UI/UX Design Icon">
              <img src={interfaceIcon} alt="UI/UX Design Icon" width="40" />
            </div>
            <div className="service-content-box">
              <h4 className="h4 service-item-title">UI/UX Design</h4>
              <p className="service-item-text">
                Create user-friendly and visually appealing interfaces.
              </p>
            </div>
          </li>

          <li className="service-item">
            <div className="service-icon-box" aria-label="Cloud Publishing Icon">
              <img src={Cloud} alt="App Store Publishing Icon" width="40" />
            </div>
            <div className="service-content-box">
              <h4 className="h4 service-item-title">App Store Publishing</h4>
              <p className="service-item-text">
                Prepare and submit apps to the App Store.
              </p>
            </div>
          </li>

          <li className="service-item">
            <div className="service-icon-box" aria-label="Maintenance Icon">
              <img src={maintenance} alt="App Maintenance Icon" width="40" />
            </div>
            <div className="service-content-box">
              <h4 className="h4 service-item-title">App Maintenance</h4>
              <p className="service-item-text">
                Provide support and updates for apps.
              </p>
            </div>
          </li>
        </ul>
        <br />
        <button className="form-btn" type="button" aria-label="Download CV">
          <ion-icon name="paper-plane" style={{ marginRight: "8px" }}></ion-icon>
          <a href={CV} download style={{ color: "#a19070", textDecoration: "none" }}>
            Download CV
          </a>
        </button>
      </section>
    </article>
  );
}

export default Service;
