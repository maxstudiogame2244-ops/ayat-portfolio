import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FaInstagram, FaFacebookF } from "react-icons/fa6";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section" id="contact">
      <div className="contact-wrapper">
        <div className="contact-header">
          <span className="contact-eyebrow">GET IN TOUCH</span>
          <h2>
            LET'S WORK <span>TOGETHER</span>
          </h2>
          <p>
            Have a project, server network, custom Minecraft plugin, launcher
            architecture, or automation system in mind? Connect directly via
            Instagram or Facebook.
          </p>
        </div>

        <div className="contact-grid">
          {/* Primary Channel: Instagram */}
          <a
            href="https://www.instagram.com/ayat22.44"
            target="_blank"
            rel="noreferrer"
            className="contact-card instagram-card"
            data-cursor="disable"
          >
            <div className="contact-card-header">
              <div className="contact-card-icon instagram-icon">
                <FaInstagram />
              </div>
              <span className="contact-status-badge">Fast Response</span>
            </div>
            <div className="contact-card-body">
              <h4>Instagram Direct</h4>
              <span className="contact-handle">@ayat22.44</span>
              <p>
                Send a direct message for quick project inquiries, Minecraft
                plugin development, and custom work.
              </p>
            </div>
            <div className="contact-card-footer">
              <span>Send Message</span>
              <MdArrowOutward />
            </div>
          </a>

          {/* Secondary Channel: Facebook */}
          <a
            href="https://www.facebook.com/AYAT.2033?mibextid=ZbWKwL"
            target="_blank"
            rel="noreferrer"
            className="contact-card facebook-card"
            data-cursor="disable"
          >
            <div className="contact-card-header">
              <div className="contact-card-icon facebook-icon">
                <FaFacebookF />
              </div>
              <span className="contact-status-badge">Connect</span>
            </div>
            <div className="contact-card-body">
              <h4>Facebook Profile</h4>
              <span className="contact-handle">AYAT.2033</span>
              <p>
                Reach out on Facebook for infrastructure consulting, VPS
                hosting setups, and business collaborations.
              </p>
            </div>
            <div className="contact-card-footer">
              <span>View Profile</span>
              <MdArrowOutward />
            </div>
          </a>
        </div>

        <div className="contact-footer-bar">
          <div className="contact-developer-credit">
            <h3>Al-Ashraful Ayat</h3>
            <p>
              Software Developer & Infrastructure Engineer • 6 Years of
              Professional Experience
            </p>
          </div>
          <div className="contact-copyright">
            <span>
              <MdCopyright /> 2026 Al-Ashraful Ayat. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
