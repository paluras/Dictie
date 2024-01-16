import github from "/github.png";
import linkedIn from "/linkedIn.png";
interface FooterProps {
    // Define any props here
}

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer>
        <h4>Contact</h4>
        <div className="img-container">
          {" "}
          <a href="https://www.linkedin.com/in/palura-andrei-588991245">
            <img width={"32px"} src={linkedIn} alt="linkedIn" />
          </a>
          <a href="https://github.com/paluras/Dictie">
            <img width={"32px"} src={github} alt="github" />
          </a>
        </div>

        <h6>made by : Palura Andrei</h6>
      </footer>
    );
};

export default Footer;
