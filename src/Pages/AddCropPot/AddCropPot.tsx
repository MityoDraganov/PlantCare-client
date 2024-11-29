import {
    SignedIn,
    SignedOut,
    SignUp,
    useUser,
    SignOutButton,
} from "@clerk/clerk-react";
import { Card } from "../../components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../../components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { assignCropPot } from "../../api/requests";
import toast from "react-hot-toast";

export const AddCropPot = () => {
    const { user } = useUser();
    const currentUrl = window.location.href;
    const navigate = useNavigate()

    const { token } = useParams();
    const assignPotHandler = async () => {
        if (!token) {
            return;
        }
        const result = await assignCropPot(token);
        toast.success("Pot assigned correctly! Navigate to your dashboard!");
        navigate("/dashboard")
    };

    return (
        <div className="flex flex-col gap-[2%] h-[90%] py-[5%] items-center">
            <div>
                <h1 className="text-3xl font-mono">Plant Care</h1>
                <p>Add Crop-Pot</p>
            </div>

            <SignedOut>
                <SignUp forceRedirectUrl={currentUrl} signInForceRedirectUrl={currentUrl} />
            </SignedOut>
            <SignedIn>
                <div className="w-[80%] h-full gap-[5%] items-center flex flex-col ">
                    <div className="w-full h-[20%] flex flex-col ">
                        <p className="p-0 text-left font-semibold pl-2">
                            Signed in as:
                        </p>
                        <Card className="w-full h-full p-[2%] flex gap-[5%]">
                            <div className="h-full aspect-square flex justify-center items-center">
                                <Avatar asChild>
                                    <AvatarImage
                                        src={user?.imageUrl}
                                        className="h-full w-full rounded-full"
                                    />
                                </Avatar>
                            </div>

                            <div className="flex flex-col text-left w-full ">
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

                    <div className="flex sm:flex-col lg:flex-row justify-between sm:gap-[5%] md:gap-[1%] items-start w-full h-full">
                        <Card className="p-4 h-4/5 lg:h-[88%] sm:w-full lg:w-2/3">
                            <p className="text-xl">
                                Would you like to{" "}
                                <span className="font-semibold font-mono">
                                    assign new{" "}
                                    <span className="uppercase">crop pot</span>
                                </span>{" "}
                                to your account?
                            </p>
                            <p className="text-md">token: <span className="font-medium">{token}</span></p>

           
                        </Card>

                        <Button
                            className="flex items-center justify-between sm:text-xl sm:py-[5%] lg:py-[2%] sm:w-full lg:w-1/3 sm:mt-0 lg:mt-[2.5%]"
                            onClick={assignPotHandler}
                        >
                            Continue <ChevronRight />
                        </Button>
                    </div>
                </div>
            </SignedIn>
        </div>
    );
};
