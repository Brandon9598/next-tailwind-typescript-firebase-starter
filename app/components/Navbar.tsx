import React from "react";
import { useUser } from "../context/userContext";
import { auth, signInWithGoogle } from "../utils/firebase/clientApp";

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
			<div className="flex-1">
				<a className="btn btn-ghost normal-case text-xl">App Logo</a>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal p-0">
					<li>
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
