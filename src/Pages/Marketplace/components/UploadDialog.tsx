import toast from "react-hot-toast";
import { uploadDriver } from "../../../api/requests";
import { InputGroup } from "../../../components/InputGroup";
import { Button } from "../../../components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "../../../components/ui/dialog";
import { UploadDriverDto } from "../../../dtos/driver.dto";
import useFormData from "../../../hooks/useForm";

export const UploadDialog = () => {
	const [driverData, onChange] = useFormData<UploadDriverDto>({
		alias: "",
		downloadUrl: "",
		marketplaceBanner: null,
	});

	const handleUploadDriver = async () => {
		await uploadDriver(driverData);
		toast.success("Driver uploaded!");
	};

	return (
		<Dialog>
			<DialogTrigger>
				<p className=" absolute bottom-1 right-2 text-sm hover:underline hover:cursor-pointer underline-offset-2">
					Are you developer? Submit your driver{" "}
					<span className="font-medium">here.</span>
				</p>
			</DialogTrigger>
			<DialogContent className="w-[35%] h-[70%] flex flex-col gap-[10%] ">
				<h2 className="text-center text-xl">Upload driver</h2>

				<div className="flex flex-col h-full justify-between">
					<div className="flex flex-col gap-3">
						<InputGroup
							id="alias"
							label="Alias"
							onChange={onChange}
							value={driverData.alias}
						/>
						<InputGroup
							id="downloadUrl"
							label="Download Url"
							onChange={onChange}
							value={driverData.downloadUrl}
							type="url"
						/>
						<InputGroup
							label="Content"
							placeHolder=""
							onChange={onChange}
							id="marketplaceBanner"
							type="file"
						/>
					</div>
					<Button onClick={handleUploadDriver}>Submit</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
