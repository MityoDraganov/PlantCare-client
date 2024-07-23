import { SignedIn, SignedOut, SignUp, useUser } from "@clerk/clerk-react";
import { Card } from "../../components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../../components/ui/button";
import { ChevronRight } from "lucide-react";
import { CropPotScene } from "./components/cropPotScene";

export const AddCropPot = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-[5%] h-full py-[5%]  items-center">
      <div>
        <h1 className="text-3xl font-mono">Plant Care</h1>
        <p>Add Crop-Pot</p>
      </div>

      <CropPotScene />
      <SignedOut>
        <SignUp forceRedirectUrl={"void:0"} />
      </SignedOut>
      <SignedIn>
        <div className="w-[80%] h-full justify-between items-center flex flex-col">
          <div className="w-full h-fit flex flex-col">
            <p className="p-0 text-left font-semibold pl-2">Signed in as:</p>
            <Card className="w-full h-fit p-[2%] flex gap-[5%]">
              <Avatar asChild className="sm:w-[20%] md:w-[10%] rounded-full">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
              <div className="flex flex-col text-left">
                <h2>
                  {user?.firstName} {user?.lastName}
                </h2>
                <p>{user?.emailAddresses?.[0]?.emailAddress}</p>
              </div>
            </Card>
          </div>

          <Button className="flex items-center justify-between px-[5%] h-[10%] w-2/3">
            Continue <ChevronRight />
          </Button>
        </div>
      </SignedIn>
    </div>
  );
};
