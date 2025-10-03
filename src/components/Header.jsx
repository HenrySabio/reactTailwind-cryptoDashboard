import { Link } from "react-router";

const Header = () => {
	return (
		<div className='flex justify-end gap-4 mb-4'>
			<Link
				to='/'
				className='nav-link'
			>
				Home
			</Link>
			<Link
				to='/about'
				className='nav-link'
			>
				About
			</Link>
		</div>
	);
};

export default Header;
