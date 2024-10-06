import { Link } from "react-router-dom";

// Footer.js
export const Footer = () => {
	return (
		<footer className="border-t h-10 shadow-lg flex items-center justify-between px-5 text-sm">
			<p className="text-center">
				© 2024 PlantCare. All rights reserved.
			</p>
			<nav>
				<ul className="flex space-x-4">
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
