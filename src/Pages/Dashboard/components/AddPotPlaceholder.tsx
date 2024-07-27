import { Sprout } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

export const AddPotPlaceholder = () => {
  return (
    <Card className="min-w-[20%] h-full py-4 pt-6 hover:bg-primary-foreground shadow-sm hover:shadow-md hover:cursor-pointer">
      <div className="w-full h-full flex flex-col items-center justify-center">

          <Sprout />
          <p className="break-keep">Add Crop Pot</p>
    
      </div>
    </Card>
  );
};
