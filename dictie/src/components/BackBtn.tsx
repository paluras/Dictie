import { Link } from "react-router-dom";

const BackBtn: React.FC = () => {
    return (
        <div className="back-btn">
        <Link to="/exercises">
          <button type="button">Exercitii</button>
        </Link>
      </div>
    );
};

export default BackBtn;
