import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../style/style.landing.css";
import imgPreview from "../assets/img-preview.png";
import "../style/style.animations.css";
import "./../index.css";
import { useContext, useEffect } from "react";
import {
  CollectionContext,
  CollectionContextType,
} from "../context/CollectionContext";
import Footer from "../components/Footer";
import Card from "../components/Card";
import BackBtn from "../components/BackBtn";

const LandingPage: React.FC = () => {
  //  Hard Fix for a design flaw
  const { setDocument } = useContext<CollectionContextType>(
    CollectionContext as unknown as React.Context<CollectionContextType>
  );
  useEffect(() => {
    setDocument("exercises-easy");
  });
  //
 

  return (
    <>
      <Header backButton={<BackBtn />} logInBtn={true} />
      <main>
        <section className="landing-main">
          <section className="container-left">
            {" "}
            <h1 className="animated-left-side">
              Noua metodă de perfecționare a dicției.
            </h1>
            <h2 className="description animated-left-side">
              O noua abordare care integrează tehnologia cu exercițiile
              practice.{" "}
            </h2>
            {/* Create button */}
            <div className="btn-container">
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
                      fill="#1a1908"
                    />
                  </svg>
                </span>

                <Link to="/exercises/0">Încearcă!</Link>
              </button>
              <svg
                className="anim-two"
                xmlns="http://www.w3.org/2000/svg"
                width="110"
                height="60"
              >
                <g
                  fill="none"
                  stroke="#1a1908"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                >
                  <path
                    className="path"
                    d="M6.229 51.784c21.772-37.742 58.396-52.588 101-48.5M2.771 45.352c1.652 4.064-.345 7.899.445 12.021 2.62-1.841 8.103-5.334 11.474-5.418"
                    pathLength="1"
                  />
                </g>
              </svg>
            </div>
          </section>

          <section className="container-right">
            <Link to={"/exercises/0"} className="link-img">
              <img className="img-preview" src={imgPreview} alt="img-preview" />
            </Link>

            <svg
              className="anim-one"
              xmlns="http://www.w3.org/2000/svg"
              width="65"
              height="45"
            >
              <g
                fill="none"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
              >
                <path
                  className="path"
                  d="M9.358 37.549c-.399-2.15-.301-4.137.191-5.941.491-1.807 1.378-3.432 2.555-4.861 1.176-1.432 2.642-2.665 4.293-3.688 1.652-1.023 3.49-1.838 5.409-2.426a25.31 25.31 0 0 1 3.471-.803 21.716 21.716 0 0 1 3.583-.267c1.196.014 2.387.136 3.548.391 1.16.254 2.291.638 3.367 1.172.66.328 1.436.827 2.184 1.44.746.613 1.465 1.342 2.004 2.129s.902 1.633.939 2.479-.25 1.694-1.012 2.488a3.388 3.388 0 0 1-2.074 1.026c-.771.099-1.598-.021-2.416-.268-.818-.246-1.627-.623-2.36-1.041a14.311 14.311 0 0 1-1.9-1.301 17.409 17.409 0 0 1-2.304-2.279 18.003 18.003 0 0 1-1.871-2.699c-.54-.957-.99-1.963-1.331-2.998a14.77 14.77 0 0 1-.681-3.167 12.406 12.406 0 0 1 .137-3.509 11 11 0 0 1 1.09-3.141c3.246-6.142 10.959-7.36 17.227-7.643 3.102-.139 6.207-.198 9.311-.239 3.193-.045 6.385.058 9.568.309"
                  pathLength="1"
                />

                <path
                  className="path"
                  strokeLinejoin="round"
                  pathLength="1"
                  d="M2.716 33.124c3.721 2.325 4.349 6.603 7.402 9.481 1.046-3.027 3.443-9.07 6.125-11.113"
                />
              </g>
            </svg>

            <svg
              className="anim-three"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="60"
            >
              <g
                fill="none"
                stroke="#1a1908"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
              >
                <path
                  className="path"
                  d="M43.354 6.702C20.408-11.712-9.671 34 6.028 51.78c9.196 10.415 28.308 2.704 38.322-2.215"
                  pathLength="1"
                />
                <path
                  className="path"
                  d="M43.69 57.59c.203-4.383 3.623-7.026 4.636-11.1-3.151.572-9.593 1.444-12.688.108"
                  pathLength="1"
                />
              </g>
            </svg>
          </section>
        </section>
        <section>
          {/* Component */}

          <Card
            title={"Niveluri de dificultate."}
            text={
              "Explorând diverse niveluri de dificultate, vei putea exersa și te vei transforma într-un expert într-un timp record."
            }
          />
          <Card
            title={"Crează propriile exerciții!"}
            text={
              " Accesează-ți contul și explorează posibilitatea de a concepe exerciții personalizate, adaptate nevoilor tale specifice."
            }
          />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
