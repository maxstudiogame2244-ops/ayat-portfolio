import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Project {
  title: string;
  category: string;
  tools: string;
  image: string;
  link?: string;
  icon?: string;
}

const projects: Project[] = [
  {
    title: "Firemax Hosting",
    category: "Cloud & Infrastructure",
    tools: "Linux VPS, Docker, Nginx, Cloudflare, Automated Node Provisioning",
    image: "/images/project-firemax.jpg",
    link: "https://www.facebook.com/AYAT.2033?mibextid=ZbWKwL",
    icon: "server",
  },
  {
    title: "Max Hunt Plugin",
    category: "Minecraft Spigot/Bukkit",
    tools: "Java, Paper/Spigot API, Modrinth, CurseForge, Event Loops",
    image: "/images/project-maxhunt.jpg",
    link: "https://modrinth.com/plugin/max-hunt",
    icon: "game",
  },
  {
    title: "Max Launcher",
    category: "Desktop Architecture",
    tools: "Java, C#, Custom UI, Asset Isolation, Automated Runtime Provisioning",
    image: "/images/project-maxlauncher.jpg",
    link: "https://max-studio.vercel.app",
    icon: "rocket",
  },
  {
    title: "Max Client",
    category: "Client & Modding",
    tools: "Fabric, Forge, Mixins, Bytecode Manipulation, Custom HUD, Optimizations",
    image: "/images/project-maxclient.png",
    link: "https://max-studio.vercel.app",
    icon: "cube",
  },
  {
    title: "Indie Game Dev",
    category: "Godot & Roblox Studio",
    tools: "Godot (GDScript), Roblox Studio (Lua), 2D Mechanics, Game Loops",
    image: "/images/project-indiegame.png",
    link: "https://max-studio.vercel.app",
    icon: "game",
  },
  {
    title: "Cloud & AI Bots",
    category: "Automation & Microservices",
    tools: "Supabase, Node.js, Python, Render, WebSockets, Discord Automation",
    image: "/images/project-automation.png",
    link: "https://www.instagram.com/ayat22.44",
    icon: "robot",
  },
];

const Work = () => {
  useGSAP(() => {
    let timeline: gsap.core.Timeline | null = null;

    const initWorkScroll = () => {
      const flex = document.querySelector<HTMLElement>(".work-flex");
      if (!flex) return;

      if (timeline) {
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
      }

      const totalScrollWidth = flex.scrollWidth;
      const viewWidth = window.innerWidth;
      const translateX = Math.max(0, totalScrollWidth - viewWidth + 160);

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "work",
        },
      });

      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });
    };

    initWorkScroll();

    const handleResize = () => {
      initWorkScroll();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    const timeout = setTimeout(handleResize, 500);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
      if (timeline) {
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
      }
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.title}
                category={project.category}
                link={project.link}
                icon={project.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
