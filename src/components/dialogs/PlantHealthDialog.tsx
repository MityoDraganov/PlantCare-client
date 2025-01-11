import { ImageUploader } from "../ImageUploader";
import { Dialog, DialogContent } from "../ui/dialog";

export const PlantHealthDialog = () => {
	return (
		<Dialog open={false}>
			<DialogContent className="w-[90%] md:w-[40%] h-[90%] px-1 pb-1 pt-10" >
				<ImageUploader onImageUpload={() => {}} />
			</DialogContent>
		</Dialog>
	);
};
