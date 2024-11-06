import { Link } from "react-router-dom";

// Footer.js
export const Footer = () => {
	return (
		<footer className="border-t h-fit py-1 sm:h-10 shadow-lg flex flex-col sm:flex-row items-center justify-between px-5 text-sm w-screen overflow-x-scroll">
			<p className="text-center text-nowrap">
				© 2024 PlantCare. All rights reserved.
			</p>
			<nav>
				<ul className="flex space-x-4">
				<li>
						<Link to="/marketplace" className="hover:underline">
							Marketplace
						</Link>
					</li>
					<li>
						<Link to="/privacy-policy" className="hover:underline">
							Privacy Policy
						</Link>
					</li>
					<li>
						<Link
							to="/terms-of-service"
							className="hover:underline"
						>
							Terms of Service
						</Link>
					</li>
					<li>
						<Link
							to="mailto:mityodraganow@gmail.com"
							className="hover:underline"
						>
							Contact Us
						</Link>
					</li>
				</ul>
			</nav>
		</footer>
	);
};
