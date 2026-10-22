import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I am Al-Ashraful Ayat, a Software Developer & Infrastructure Engineer
          with 6 years of experience architecting high-performance systems,
          custom Minecraft server networks, game launchers, and resilient cloud
          backends.
        </p>
        <div className="about-profile-card">
          <img
            src="/images/avatar.jpg"
            alt="Al-Ashraful Ayat"
            className="about-avatar-img"
          />
          <div className="about-profile-info">
            <h4>Al-Ashraful Ayat</h4>
            <div className="about-badge">6 Years of Experience</div>
            <div className="about-subtext">
              Infrastructure • Minecraft & Game Dev • Full Stack
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
