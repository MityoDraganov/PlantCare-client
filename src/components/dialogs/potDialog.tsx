import { Settings } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import useFormData from "../../hooks/useForm";
import { Button } from "../ui/button";
import { InputGroup, orientationOpts } from "../InputGroup";
import { useEffect, useState } from "react";
import { CropPotResponseDto } from "../../dtos/cropPot.dto";
import { updatePot } from "../../api/requests";

export const PotDialog = ({ pot }: { pot: CropPotResponseDto }) => {
	const [updateData, setPartialChange, setUpdateData] = useFormData(pot);
	const [isEditting, setIsEditting] = useState<boolean>(false);

	useEffect(() => {
		setIsEditting(
			Object.keys(pot).some(
				(key) =>
					pot[key as keyof CropPotResponseDto] !==
					updateData[key as keyof CropPotResponseDto]
			)
		);
	}, [updateData]);

	const saveUpdate = async () => {
		await updatePot(pot.id, updateData);
		console.log("here");

		setIsEditting(false);
	};

	return (
		<Dialog>
			<DialogTrigger>
				<Settings />
			</DialogTrigger>
			<DialogContent className="w-1/3 px-10 pt-10">
				<div className="flex flex-col gap-4 pl-2 pb-4">
					<h2 className="text-lg font-medium">Edit pot</h2>
					<div className="flex flex-col gap-2 ">
						<InputGroup
							type={"text"}
							value={updateData.alias}
							onChange={(e) =>
								setPartialChange({
									id: "alias",
									value: e.target.value,
								})
							}
							id={"alias"}
							label="Alias"
							orientation={orientationOpts.horizontal}
							isEditing={true}
						/>
					</div>

					<InputGroup
						type={"time"}
						value={updateData.measurementInterval}
						onChange={(e) =>
							setPartialChange({
								id: "measurementInterval",
								value: e.target.value,
							})
						}
						id={"measurementInterval"}
						label={"Measurement Interval"}
						orientation={orientationOpts.horizontal}
						isEditing={true}
					/>

					<div
						className={`flex gap-2 transition-opacity duration-300 mr-2 ml-auto ${
							isEditting ? "opacity-100" : "opacity-0"
						}`}
					>
						<Button
							variant="secondary"
							onClick={() => {
								setUpdateData(pot);
							}}
							disabled={!isEditting}
						>
							Cancel
						</Button>
						<Button
							variant="blue"
							onClick={saveUpdate}
							disabled={!isEditting}
						>
							Save
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
