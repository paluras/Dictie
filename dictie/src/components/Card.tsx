
import "../style/style.card.css";
interface CardProps {
  title: string;
  text: string;
}

const Card: React.FC<CardProps> = ({ title, text }) => {
  return (
    <div className="card-container">
      <div className="text-left">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Card;
