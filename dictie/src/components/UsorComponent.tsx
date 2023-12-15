import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/style.exercise.css";

const UsorComp: React.FC = () => {
  const [visitedLinks, setVisitedLinks] = useState<string[]>([]);

  useEffect(() => {
    const storedLinks = localStorage.getItem("visitedLinks");
    if (storedLinks) {
      setVisitedLinks(JSON.parse(storedLinks));
    }
  }, []);

  console.log(visitedLinks, "visitedLinks");

  const handleClick = (path: string) => {
    if (!visitedLinks.includes(path)) {
      const newVisitedLinks = [...visitedLinks, path];
      setVisitedLinks(newVisitedLinks);
      localStorage.setItem("visitedLinks", JSON.stringify(newVisitedLinks));
    }
  };

  return (
    <div>
      <h1>usor</h1>
      <ul>
        <Link
          to={"/exercises/easy"}
          onClick={() => handleClick("/exercises/easy")}
        >
          <li
            className={
              visitedLinks.includes("/exercises/easy") ? "visited" : "list-item"
            }
          >
            sase sasi
          </li>
        </Link>
        <Link
          onClick={() => handleClick("/exercises/easy-two")}
          to={"/exercises/easy-two"}
        >
          <li
            className={
              visitedLinks.includes("/exercises/easy-two")
                ? "visited"
                : "list-item"
            }
          >
            retevei
          </li>
        </Link>
        <Link
          to={"/exercises/easy-three"}
          onClick={() => handleClick("/easy-three")}
        >
          <li
            className={
              visitedLinks.includes("/easy-three") ? "visited" : "list-item"
            }
          >
            nămol
          </li>
        </Link>
        <Link
          onClick={() => handleClick("/easy-four")}
          to={"/exercises/easy-four"}
        >
          <li
            className={
              visitedLinks.includes("/easy-four") ? "visited" : "list-item"
            }
          >
            vultur
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default UsorComp;
