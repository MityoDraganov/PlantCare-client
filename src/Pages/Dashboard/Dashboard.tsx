
import { PotsSelect } from "./components/PotsSelect";
import { PinnedPot } from "./components/PinnedPot/PinnedPot";

export const Dashboard = () => {
  return (


      <div className="flex flex-col w-full md:h-full p-4 gap-4 overflow-auto">
        <PotsSelect />

        <PinnedPot />

    </div>
  );
};
