import { Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";

// Footer.js
export const Footer = () => {
	const { t } = useTranslation();
	return (
		<footer className="bg-secondary text-primary py-2 fixed bottom-0 w-screen overflow-hidden flex flex-col md:flex-row justify-between items-center px-[5%]">
			<div className="flex items-center space-x-2 mb-4 md:mb-0">
				<Leaf className="h-6 w-6 text-green-600" />
				<span className="text-xl font-bold">PlantsCare</span>
			</div>
			<div className="text-center text-sm ">
				© 2024 - {new Date().getFullYear()} PlantsCare.
				{t("home.footer.copyright")}
			</div>
			<nav className="flex space-x-4">
				<a
					href="#"
					className="text-sm  hover:text-green-600"
				>
					{t("home.footer.privacyPolicy")}
				</a>
				<a
					href="#"
					className="text-sm  hover:text-green-600"
				>
					{t("home.footer.termsOfService")}
				</a>
				<a
					href="#"
					className="text-sm  hover:text-green-600"
				>
					{t("home.footer.contactUs")}
				</a>
			</nav>
		</footer>
	);
};
