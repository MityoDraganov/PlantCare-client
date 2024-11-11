import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Inbox } from "./dialogs/Inbox";
import { ModeToggle } from "./theme-switch";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Languages } from "lucide-react";
import { SelectItem } from "@radix-ui/react-select";
import { useTranslation } from "react-i18next";

export const Header = () => {
	const { i18n } = useTranslation();
	const language = i18n.language;
	const handleLanguageChange = (language: string) => {
		i18n.changeLanguage(language);
	};
	return (
		<header className="flex justify-between h-[7dvh] overflow-hidden border-b shadow-sm py-1 px-2 z-50">
			<Link to="/" className="h-full flex gap-1 items-center">
				<div className="h-full">
					<img src="/icons/icon_transparent.png" className="h-full" />
				</div>
				<h2 className="text-2xl">PlantsCare</h2>
			</Link>

			<div className="flex gap-4 items-center w-1/5">
				<Select onValueChange={handleLanguageChange}>
					<SelectTrigger className="w-fit">
						<SelectValue placeholder={<Languages />}>
							{language === "en" ? (
								<span className="mr-2">🇬🇧</span>
							) : (
								<span className="mr-2">🇧🇬</span>
							)}
							{language}
						</SelectValue>
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

				<SignedOut>
					<ul className="flex gap-2 items-center">
						<SignInButton
							mode="modal"
							forceRedirectUrl={window.location.href}
							signUpForceRedirectUrl={window.location.href}
						>
							<Button variant="secondary">Sign in</Button>
						</SignInButton>
						<SignUpButton
							mode="modal"
							forceRedirectUrl={window.location.href}
							signInForceRedirectUrl={window.location.href}
						>
							<Button>Sign up</Button>
						</SignUpButton>
					</ul>
				</SignedOut>

				<SignedIn>
					<Inbox />
					<UserButton />
				</SignedIn>

				<ModeToggle />
			</div>
		</header>
	);
};
