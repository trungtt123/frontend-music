import logo from "../logo1.png";
import '../css/logo.css'
function Logo(props) {
    return (
        <div>
            <img className='logo' src={logo} />
        </div>

    );
}

export default Logo;
