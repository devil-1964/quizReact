import Buttons from "./Buttons";
import { Link } from "react-router-dom";

const ButtonLink = ({ text, tot }) => {
    return (
        <Link to={tot}>
            <Buttons text={text} />
        </Link>
    );
}

export default ButtonLink;