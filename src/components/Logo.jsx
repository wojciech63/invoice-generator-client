import {assets} from "../assets/assets.js";

const Logo = () => {
    return (
        <img className="logo" src={assets.logo} alt="Logo" height = {48} width={48} />
    )
}

export default Logo;