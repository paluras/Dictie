import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../style/style.landing.css";
import imgPreview from "../assets/img-preview.png";
import "../style/style.animations.css"

const LandingPage: React.FC = () => {
  return (
    <>
      <Header backButton={<button></button>} />
      <main className="landing-main">
        <div className="container-left">
          {" "}
          <h1 className="animated-left-side">noua metodă de perfecționare a dicției.</h1>
          <h2 className="description animated-left-side">
          O abordare inovatoare care integrează tehnologiile avansate cu exercițiile practice.          </h2>
          {/* Create button */}
          <button className="big-btn animated-left-side" type="button">
            <span>
              <svg
                className="arrow"
                xmlns="http://www.w3.org/2000/svg"
                width="175"
                height="255"
                viewBox="0 0 175 255"
                fill="none"
              >
                <path
                  d="M47.7037 0L0 47.7037L79.5061 127.21L0 206.716L47.7037 254.419L174.913 127.21L47.7037 0Z"
                  fill="black"
                />
              </svg>
            </span>
            <Link to="/easy">Incearca!</Link>
          </button>
        </div>
        <div className="container-right">
          <Link to={"/easy"} className="link-img">
            <img className="img-preview" src={imgPreview} alt="img-preview" />
          </Link>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
