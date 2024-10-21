import { Link } from "react-router-dom";

const ButtonLink = ({ text, tot }) => {
    return (
        <Link to={tot}>
            <button style={{minWidth:"fit-content"}} className='button-35'>{text}</button>
        </Link>
    );
}

export default ButtonLink;