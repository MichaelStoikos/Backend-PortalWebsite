import { Link } from "react-router-dom";
import logo from "/src/assets/LOGO.png";

function Header() {
	return (
		<>
			<nav>
				<Link to={"/"}>
					<img src={logo} alt="logo" />
				</Link>
			</nav>
		</>
	);
}
export default Header;
