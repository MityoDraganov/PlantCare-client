import { Card, CardContent } from "../../../components/ui/card";

export const PhotoCard = ({ imgUrl }: { imgUrl: string }) => {
  return (
    <Card className="relative w-full h-full  p-2 flex flex-col ">
      <div className="text-sm ">
        <span>Last taken photo:</span>
      </div>
      <CardContent className="h-full w-full p-2">
        <img
          draggable={false}
          className="w-full h-full object-cover rounded"
          src={imgUrl}
        />
      </CardContent>
    </Card>
  );
};
