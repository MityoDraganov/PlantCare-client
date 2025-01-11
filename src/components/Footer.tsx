import { Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Footer.js
export const Footer = () => {
	const { t } = useTranslation();
	return (
		
		<footer className="bg-gray-100 py-8">
		<div className="container mx-auto px-4">
			<div className="flex flex-col md:flex-row justify-between items-center">
				<div className="flex items-center space-x-2 mb-4 md:mb-0">
					<Leaf className="h-6 w-6 text-green-600" />
					<span className="text-xl font-bold">
						PlantsCare
					</span>
				</div>
				<nav className="flex space-x-4">
					<a
						href="#"
						className="text-sm text-gray-600 hover:text-green-600"
					>
						{t("home.footer.privacyPolicy")}
					</a>
					<a
						href="#"
						className="text-sm text-gray-600 hover:text-green-600"
					>
						{t("home.footer.termsOfService")}
					</a>
					<a
						href="#"
						className="text-sm text-gray-600 hover:text-green-600"
					>
						{t("home.footer.contactUs")}
					</a>
				</nav>
			</div>
			<div className="mt-4 text-center text-sm text-gray-600">
			© 2024 - {new Date().getFullYear()} PlantsCare.{t("home.footer.copyright")}
			</div>
		</div>
	</footer>	);
};
