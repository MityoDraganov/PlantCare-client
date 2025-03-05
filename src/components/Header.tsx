import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import { Inbox } from "./dialogs/Inbox";
import { ModeToggle } from "./theme-switch";

import { useTranslation } from "react-i18next";
import { LanguageSelect } from "./LanguageSelect";
import { Leaf } from "lucide-react";
import { handleScroll } from "../lib/functions";

export const Header = () => {
	const { t } = useTranslation();
	const location = useLocation();
	return (
		// <header className="flex justify-between h-[7dvh] overflow-hidden border-b shadow-sm py-1 px-2 z-50">
		// 	<Link to="/" className="h-full flex gap-1 items-center">
		// 		<div className="h-full">
		// 			<img src="/icons/icon_transparent.png" className="h-full" />
		// 		</div>
		// 		<h2 className="text-2xl">PlantsCare</h2>
		// 	</Link>

		// 	<div className="flex gap-4 items-center ">
		// 		<LanguageSelect />

		// 		<SignedOut>
		// 			<ul className="flex gap-2 items-center">
		// 				<SignInButton
		// 					mode="modal"
		// 					forceRedirectUrl={window.location.href}
		// 					signUpForceRedirectUrl={window.location.href}
		// 				>
		// 					<Button variant="secondary">
		// 						{t("header.signIn")}
		// 					</Button>
		// 				</SignInButton>
		// 				<SignUpButton
		// 					mode="modal"
		// 					forceRedirectUrl={window.location.href}
		// 					signInForceRedirectUrl={window.location.href}
		// 				>
		// 					<Button>{t("header.signUp")}</Button>
		// 				</SignUpButton>
		// 			</ul>
		// 		</SignedOut>

		// 		<SignedIn>
		// 			<Inbox />
		// 			<UserButton />
		// 		</SignedIn>

		// 		<ModeToggle />
		// 	</div>
		// </header>

		<header className="border-b w-full bg-secondary/75 z-10">
			<div className=" mx-auto px-4 py-4 flex items-center justify-between">
				<Link to={"/"} className="flex items-center space-x-2">
					<Leaf className="h-6 w-6 text-green-600" />
					<span className="text-xl font-bold">PlantsCare</span>
				</Link>

				{location.pathname === "/" && (
				<nav className="absolute left-[42.5%] -transalte-x-1/2 hidden md:flex space-x-4">
					<a
						onClick={() => handleScroll("features")}
						href="void(0)"
						className="text-sm font-medium hover:text-green-600"
					>
						{t("home.header.features")}
					</a>
					<a
						href="#how-it-works"
						className="text-sm font-medium hover:text-green-600"
					>
						{t("home.header.howItWorks")}
					</a>
					<a
						href="#contact"
						className="text-sm font-medium hover:text-green-600"
					>
						{t("home.header.contact")}
					</a>
				</nav>
				)}
				<div className="flex items-center gap-8">
					<ModeToggle />
					<LanguageSelect />
				
						<SignedIn>
						
							{location.pathname === "/" ? (
								<Link to="/dashboard">
									<Button
										size="lg"
										className="bg-green-600 hover:bg-green-700"
									>
										{t("home.hero.cta")}
									</Button>
								</Link>
							) : (
								<div className="flex items-center gap-4">
									{/* <Inbox /> */}
									<UserButton />
								</div>
							)}
							
						</SignedIn>
						<SignedOut>
							<ul className="flex gap-2 items-center">
								<SignInButton
									mode="modal"
									forceRedirectUrl={window.location.href}
									signUpForceRedirectUrl={
										window.location.href
									}
								>
									<Button variant="secondary">
										{t("home.header.signIn")}
									</Button>
								</SignInButton>
								<SignUpButton
									mode="modal"
									forceRedirectUrl={window.location.href}
									signInForceRedirectUrl={
										window.location.href
									}
								>
									<Button className="bg-green-600 hover:bg-green-700">
										{t("home.header.getStarted")}
									</Button>
								</SignUpButton>
							</ul>
						</SignedOut>
					
				</div>
			</div>
		</header>
	);
};
