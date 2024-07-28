import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export const PhotoCard = ({ imgUrl }: { imgUrl: string }) => {
  return (
    <div className="relative w-[full%] h-[95%] bg-white border border-gray-300 shadow-lg rounded-lg p-2 flex flex-col items-center">
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <img
          draggable={false}
          className="w-full h-full object-cover"
          src={imgUrl}
        />
      </div>
      <div className="absolute top-4 left-0 right-0 text-center text-sm text-gray-600">
        <span>Last taken photo:</span>
      </div>
    </div>
  );
};
