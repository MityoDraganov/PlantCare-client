import toast from "react-hot-toast";
import {
	deleteDriver,
	updateDriver,
	uploadDriver,
} from "../../../api/requests";
import { InputGroup } from "../../../components/InputGroup";
import { Button } from "../../../components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "../../../components/ui/dialog";
import { UploadDriverDto } from "../../../dtos/driver.dto";
import useFormData from "../../../hooks/useForm";
import { useEffect } from "react";
import { useLoading } from "../../../contexts/LoadingContext";

interface UploadDialogProps {
	initialData?: UploadDriverDto; // Optional initial data for edit mode
	driverId?: number;
	onSubmitSuccess?: () => void; // Callback to handle successful submission
}

export const UploadDialog = ({
	initialData,
	onSubmitSuccess,
	driverId,
}: UploadDialogProps) => {
	const [driverData, onChange, setDriverData] = useFormData<UploadDriverDto>({
		alias: "",
		downloadUrl: "",
		marketplaceBanner: null,
	});

	const { beginLoading, endLoading } = useLoading()

	// Set initial data when editing
	useEffect(() => {
		if (initialData) setDriverData(initialData);
	}, [initialData]);

	const handleUploadDriver = async () => {
		let response = null;
		beginLoading()
	
		if (initialData && driverId) {
			response = await updateDriver(driverData, driverId);
			if (response) {
				toast.success("Driver updated successfully!");
				onSubmitSuccess?.();
			}
		} else {
			response = await uploadDriver(driverData);
			if (response) {
				toast.success("Driver uploaded!");
				onSubmitSuccess?.();
			}
		}
		endLoading()
	};
	
	const handleDeleteDriver = async () => {
		if(!driverId){
			return;
		}
		await deleteDriver(driverId);
	};

	return (
		<Dialog>
			<DialogTrigger>
				{initialData ? (
					<Button>Edit</Button>
				) : (
					<p className=" absolute bottom-1 right-2 text-sm hover:underline hover:cursor-pointer underline-offset-2">
						Are you developer? Submit your driver{" "}
						<span className="font-medium">here.</span>
					</p>
				)}
			</DialogTrigger>
			<DialogContent className="w-[35%] h-[70%] flex flex-col gap-[10%] ">
				<h2 className="text-center text-xl">
					{initialData ? "Edit Driver" : "Upload Driver"}
				</h2>
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
					<div className="flex flex-col gap-3">
						<Button onClick={handleUploadDriver}>
							{initialData ? "Update" : "Submit"}
						</Button>
						{initialData && driverId && (
							<Button
								variant="destructive"
								onClick={handleDeleteDriver}
							>
								Delete
							</Button>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
