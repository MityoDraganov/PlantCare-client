import { Camera } from "lucide-react";
import { ImageUploader } from "../ImageUploader";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { sendPicture } from "../../api/requests";

export const PlantHealthDialog = ({measurementGroupId}: {measurementGroupId: number}) => {
	const uploadImageHandler = (imageFile: File) => {
		sendPicture(measurementGroupId, imageFile);
	};
	return (
		<Dialog>
			<DialogTrigger className="w-full">
				<Button
					//disabled={isPhotoTaken}
					className="w-full"
				>
					<Camera className="mr-2 h-4 w-4" />
					Take a Picture of Your Plant
				</Button>
			</DialogTrigger>
			<DialogContent className="w-[90%] md:w-[40%] h-[90%] px-1 pb-1 pt-10">
				<ImageUploader onImageUpload={uploadImageHandler} />
			</DialogContent>
		</Dialog>
	);
};
