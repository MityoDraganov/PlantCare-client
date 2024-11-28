import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Footer.js
export const Footer = () => {
	const { t } = useTranslation();
	return (
		<footer className="border-t h-fit py-1 sm:h-10 shadow-lg flex flex-col sm:flex-row items-center justify-between px-5 text-sm w-screen overflow-x-scroll text-nowrap">
			<p className="text-center text-nowrap">
				© 2024 PlantCare. {t('footer.allRightsReserved')}.
			</p>
			<nav>
				<ul className="flex space-x-4">
				<li>
						<Link to="/marketplace" className="hover:underline">
						{t('footer.marketplace')}
						</Link>
					</li>
					<li>
						<Link to="/privacy-policy" className="hover:underline">
							{t('footer.privacyPolicy')}
						</Link>
					</li>
					<li>
						<Link
							to="/terms-of-service"
							className="hover:underline"
						>
							{t('footer.termsOfService')}
						</Link>
					</li>
					<li>
						<Link
							to="mailto:mityodraganow@gmail.com"
							className="hover:underline"
						>
							{t('footer.contacts')}
						</Link>
					</li>
				</ul>
			</nav>
		</footer>
	);
};
