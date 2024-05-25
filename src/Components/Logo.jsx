 import { Link } from "react-router-dom"
 function Logo() {
    return (
        <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 className="monoton-regular logo">Quiz</h1>
        </Link>
    )
}

export default Logo