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
  const links = [
    { path: "/exercises/easy", text: "sase sasi" },
    { path: "/exercises/easy-one", text: "retevei" },
    { path: "/exercises/easy-two", text: "nămol" },
    { path: "/exercises/easy-three", text: "vultur" },
    { path: "/exercises/easy-four", text: "greierii" },
    { path: "/exercises/easy-five", text: "meduze" },
    { path: "/exercises/easy-six", text: "o babă" },
    { path: "/exercises/easy-seven", text: "gârbovit" },
    { path: "/exercises/easy-eight", text: "buburuze" },
    { path: "/exercises/easy-nine", text: "curcanul" },
  ];
  // .map over the array of links and render them

  return (
    <div>
      <h1>usor</h1>
            <ul>
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => handleClick(link.path)}
                >
                  <li
                    className={
                      visitedLinks.includes(link.path) ? "visited" : "list-item"
                    }
                  >
                    {link.text}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        );
    
 
};

export default UsorComp;
