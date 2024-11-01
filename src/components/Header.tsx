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

export const Header = () => {
	
	return (
		<header className="flex justify-between h-[7dvh] overflow-hidden border-b shadow-sm py-1 px-2">
			<Link to="/" className="h-full flex gap-1 items-center">
				<div className="h-full">
					<img src="/icons/icon_transparent.png" className="h-full" />
				</div>
				<h2 className="text-2xl">PlantsCare</h2>
			</Link>

			<div className="flex gap-4 items-center">
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
					<Inbox/>
					<UserButton />
				</SignedIn>

				<ModeToggle />
			</div>
		</header>
	);
};
