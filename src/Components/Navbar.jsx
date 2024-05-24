import Coins from "./Coins";
import Logo from "./Logo";
const Navbar = () => {
    return (
        <>
        <nav className="navbar">
            <Logo />
            <Coins />
        </nav>
            <p className="line"></p>
            </>

    )
}

export default Navbar;