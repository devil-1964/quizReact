import { useState } from "react";
import myCoins from '../assets/coin.svg';
import '../App.css';

const Coins = () => {
    const [coins, setCoins] = useState(0);
return (
<div className="divCoins shadowBox">
<img src={myCoins} alt="coins" className="imgCoins"/>
<h1 className="coin">{coins}</h1>
</div>

)
}
export default Coins;