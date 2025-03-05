import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Languages } from "lucide-react";
import { LANGUAGE_KEY, setLanguage } from "../lib/translation";
import { useTranslation } from "react-i18next";

export const LanguageSelect = () => {
	const { i18n } = useTranslation();
	const language = i18n.language;
	const handleLanguageChange = (language: string) => {
		localStorage.setItem(LANGUAGE_KEY, language);
		i18n.changeLanguage(language);
		setLanguage(language);
	};
	return (
		<Select onValueChange={handleLanguageChange} defaultValue="bg">
			<SelectTrigger className="w-fit">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={"en"} key={"en"}>
					🇬🇧 EN
				</SelectItem>

				<SelectItem value={"bg"} key={"bg"}>
					🇧🇬 BG
				</SelectItem>
			</SelectContent>
		</Select>
	);
};
