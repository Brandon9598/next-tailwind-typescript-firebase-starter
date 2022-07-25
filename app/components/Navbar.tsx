import React from "react";
import { useUser } from "../context/userContext";
import { auth, signInWithGoogle } from "../utils/firebase/clientApp";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
	const { user } = useUser();

	const handleLogin = async () => {
		await signInWithGoogle();
	};

	const handleLogout = () => {
		auth.signOut();
	};

	return (
		<div className="navbar bg-neutral text-neutral-content">
			<div className="navbar-start">
				<a className="btn btn-ghost normal-case text-xl">App Logo</a>
			</div>
			<div className="navbar-end flex-none md:hidden">
				<div className="dropdown">
					<label tabIndex={0}>
						<MenuIcon />
					</label>
					<ul
						tabIndex={0}
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52  text-neutral"
					>
						<li>
							<a>Link 1</a>
						</li>
						<li>
							<a>Link 2</a>
						</li>
						<li>
							{!user ? (
								<a onClick={handleLogin}>Login</a>
							) : (
								<a onClick={handleLogout}>Logout</a>
							)}
						</li>
					</ul>
				</div>
			</div>
			<div className="navbar-end hidden md:flex ">
				<ul className="menu menu-horizontal p-0">
					<li tabIndex={0}>
						<a>Link 1</a>
					</li>
					<li>
						<a>Link 2</a>
					</li>
					<li>
						{!user ? (
							<button
								className="btn btn-outline hover:bg-white hover:text-neutral"
								onClick={handleLogin}
							>
								Login
							</button>
						) : (
							<button
								className="btn btn-outline hover:bg-white hover:text-neutral"
								onClick={handleLogout}
							>
								Logout
							</button>
						)}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
