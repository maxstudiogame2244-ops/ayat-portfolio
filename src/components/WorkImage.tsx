import { MdArrowOutward } from "react-icons/md";
import {
  FaServer,
  FaGamepad,
  FaRocket,
  FaCode,
  FaRobot,
  FaCube,
} from "react-icons/fa6";

interface Props {
  image: string;
  alt?: string;
  link?: string;
  category?: string;
  icon?: string;
}

const WorkImage = (props: Props) => {
  const getIcon = () => {
    switch (props.icon) {
      case "server":
        return <FaServer />;
      case "game":
        return <FaGamepad />;
      case "rocket":
        return <FaRocket />;
      case "cube":
        return <FaCube />;
      case "robot":
        return <FaRobot />;
      default:
        return <FaCode />;
    }
  };

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link || "#"}
        target={props.link ? "_blank" : undefined}
        rel="noreferrer"
        data-cursor="disable"
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <div className="work-card-visual">
          <img
            src={props.image}
            alt={props.alt || "Project preview"}
            className="work-card-img"
          />
          <div className="work-card-overlay">
            <div className="work-card-top">
              <span className="work-card-badge">
                {props.category || "PROJECT"}
              </span>
              <div className="work-card-icon">{getIcon()}</div>
            </div>
            <div className="work-card-bottom">
              <h5>{props.alt}</h5>
              <span className="work-card-hint">
                {props.link ? "Click to view project ↗" : "Active Venture"}
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default WorkImage;
