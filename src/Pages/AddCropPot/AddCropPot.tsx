import {
  SignedIn,
  SignedOut,
  SignUp,
  useUser,
  SignOutButton,
} from "@clerk/clerk-react";
import { Card, CardContent, CardDescription } from "../../components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../../components/ui/button";
import { ChevronRight } from "lucide-react";
import { CropPotScene } from "./components/cropPotScene";

export const AddCropPot = () => {
  const { user } = useUser();
  const currentUrl = window.location.href;

  return (
    <div className="flex flex-col gap-[2%] h-full py-[5%]  items-center">
      <div>
        <h1 className="text-3xl font-mono">Plant Care</h1>
        <p>Add Crop-Pot</p>
      </div>

      <SignedOut>
        <SignUp
          redirectUrl={currentUrl}
          forceRedirectUrl={currentUrl}
          fallbackRedirectUrl={currentUrl}
        />
      </SignedOut>
      <SignedIn>
        <div className="w-[80%] h-full gap-[5%] items-center flex flex-col">
          <div className="w-full h-fit flex flex-col">
            <p className="p-0 text-left font-semibold pl-2">Signed in as:</p>
            <Card className="w-full h-fit p-[2%] flex gap-[5%]">
              <Avatar asChild className="sm:w-[20%] md:w-[10%] rounded-full">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
              <div className="flex flex-col text-left w-full">
                <h2 className="font-semibold">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p>{user?.emailAddresses?.[0]?.emailAddress}</p>

                <Button className="mb-0 mt-auto mr-2 ml-auto">
                  <SignOutButton redirectUrl={currentUrl} />
                </Button>
              </div>
            </Card>
          </div>

          <div className="flex justify-between items-start w-full h-max">
            <Card className="p-4 h-[88%]">
              <p>
                Would you like to{" "}
                <span className="font-semibold font-mono">
                  assign new <span className="uppercase">crop pot</span>
                </span>{" "}
                to your account?
              </p>

              <h2>ID: </h2>

              <CropPotScene />
            </Card>

            <Button className="flex items-center justify-between py-[2%] w-1/3 mt-[2.5%]">
              Continue <ChevronRight />
            </Button>
          </div>
        </div>
      </SignedIn>
    </div>
  );
};
