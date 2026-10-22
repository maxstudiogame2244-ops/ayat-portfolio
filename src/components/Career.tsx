import "./styles/Career.css";

const careerHistory = [
  {
    year: "NOW",
    role: "AI & Automation Engineer",
    company: "Autonomous Systems & Cloud",
    description:
      "Engineered custom AI-driven workflows, intelligent automation systems, Discord bots, and microservice backends utilizing modern cloud stacks like Supabase, Render, Python, and WebSockets.",
  },
  {
    year: "2025",
    role: "Launcher Architect & Client Dev",
    company: "Max Launcher & Client Ecosystem",
    description:
      "Launched Max Launcher with automated asset management, runtime provisioning, and version isolation. Engineered custom Minecraft client modifications using Fabric, Forge, and Mixins.",
  },
  {
    year: "2024",
    role: "Founder & Plugin Developer",
    company: "Firemax Hosting & Max Hunt",
    description:
      "Founded Firemax Minecraft Hosting, providing automated node deployment and high-performance VPS infrastructure. Published Max Hunt on CurseForge & Modrinth, and expanded into professional freelancing.",
  },
  {
    year: "2023",
    role: "E-Commerce Founder & Freelancer",
    company: "Digital Commerce & Systems",
    description:
      "Launched e-commerce business ventures, engineered custom online sales channels, and provided freelance development solutions for international clients.",
  },
  {
    year: "2022",
    role: "VPS & Hosting Specialist",
    company: "Infrastructure & Server Networks",
    description:
      "Managed bare-metal and VPS infrastructure worldwide. Specialized in Linux server administration (Ubuntu/Debian), Docker containerization, Nginx routing, and network privacy/security tooling.",
  },
  {
    year: "2020",
    role: "Started Learning & Early Modding",
    company: "Developer Foundations",
    description:
      "Began learning core programming in Java, Python, and web technologies. Developed early Spigot/Bukkit plugins and server configurations, igniting a 6-year professional journey in software engineering.",
  },
];

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {careerHistory.map((item, index) => (
            <div className="career-info-box" key={index}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{item.role}</h4>
                  <h5>{item.company}</h5>
                </div>
                <h3>{item.year}</h3>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
