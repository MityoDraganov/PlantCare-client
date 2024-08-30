import { Settings } from "lucide-react";
import {
	ControlSettingsDto,
	CropPotResponseDto,
} from "../../../../dtos/CropPot.dto";
import { Chart } from "../../cards/Chart";
import { Input } from "../../../ui/input";
import { Dispatch, SetStateAction } from "react";
import { tabOptions } from "../PotCard";
import useFormData from "../../../../hooks/useForm";
import { Button } from "../../../ui/button";

export const InfoTab = ({
	pot,
	setTab,
}: {
	pot: CropPotResponseDto;
	setTab: Dispatch<SetStateAction<tabOptions>>;
}) => {
	const [updateData, handleInputChange, setUpdateData] = useFormData<ControlSettingsDto>(
		pot.controlSettings
	);


	return (
		<div className="grid grid-cols-1 h-[90%] md:grid-cols-2 gap-2">
			<div className="md:border-r h-full md:border-gray-300 pr-6">
				<p className="flex flex-col">
					<span className="font-semibold">Last watered:</span>{" "}
					<span className="text-muted-foreground">
						{new Date(pot.lastWateredAt).toUTCString()}
					</span>
				</p>

				<div className="h-max">
					<Chart sensors={pot.sensors} />
				</div>
			</div>
			<div className="pl-3 flex flex-col justify-between h-full pb-5">
				<div className="flex flex-col gap-[2%] h-full pb-2">
					<h2 className="text-lg font-medium flex gap-[1%] items-center border-b pb-2">
						{" "}
						<Settings />
						Settings
					</h2>

					<ul className="py-2 h-full">
						{Object.keys(updateData)
							.filter((key) => key !== "id")
							.map((x) => (
								<li className="flex items-center gap-2" key={x}>
									<span>
										{x.charAt(0).toUpperCase() +
											x
												.slice(1)
												.split(/(?=[A-Z])/)
												.join(" ")
												.toLowerCase()}
										:
									</span>

									<Input
										className="h-fit py-1 pr-0 w-1/4 text-center"
										type="number"
										value={
											updateData[
												x as keyof typeof updateData
											]
										}
										onChange={handleInputChange}
										id={x}
									/>
								</li>
							))}
					</ul>

					<div
						className={`flex gap-2 transition-opacity duration-300 ${
							Object.keys(updateData)
								.filter((key) => key !== "id")
								.some(
									(key) =>
										updateData[
											key as keyof ControlSettingsDto
										] !==
										pot.controlSettings[
											key as keyof ControlSettingsDto
										]
								)
								? "opacity-100"
								: "opacity-0"
						}`}
					>
						<Button variant="secondary" onClick={() => setUpdateData(pot.controlSettings)}>Cancel</Button>
						<Button variant="blue">Save</Button>
					</div>
				</div>

				<p
					className="text-sm hover:underline hover:text-black text-muted-foreground transition-all duration-100"
					onClick={() => setTab(tabOptions.advancedSettings)}
				>
					Advanced Settings
				</p>
			</div>
		</div>
	);
};
