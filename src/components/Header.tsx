import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="flex justify-between h-[6%] overflow-hidden bg-white border-b shadow-sm px-2">
      <Link to="/" className="h-full flex gap-1 items-center">
        <div className="h-full">
          <img src="/icons/icon_transparent.png" className="h-full" />
        </div>
        <h2 className="text-2xl">Plants-Care</h2>
      </Link>

      <div className="flex gap-4 items-center">
        <SignedOut>
          <ul className="flex gap-2 items-center">
            <SignInButton mode="modal">
              <Button variant="secondary">Sign in</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Sign up</Button>
            </SignUpButton>
          </ul>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
