
import { PinnedPot } from "./components/PinnedPot/PinnedPot";

export const Dashboard = () => {
  return (
      <div className="flex flex-col w-full h-max lg:h-full p-4 gap-4 overflow-y-auto overflow-x-hidden">
        <PinnedPot />
    </div>
  );
};
