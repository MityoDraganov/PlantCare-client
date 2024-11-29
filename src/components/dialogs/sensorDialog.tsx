import { Settings } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import useFormData from "../../hooks/useForm";
import { SensorDto } from "../../dtos/sensors.dto";
import { updateSensor } from "../../api/requests";
import { Button } from "../ui/button";
import { InputGroup, orientationOpts } from "../InputGroup";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const SensorDialog = ({ sensor }: { sensor: SensorDto }) => {
	const [updateData, setPartialChange, setUpdateData] = useFormData(sensor);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const { t } = useTranslation();
	// Update the form data when the `sensor` prop changes
	useEffect(() => {
		setUpdateData(sensor);
	}, [sensor]);

	useEffect(() => {
		setIsEditing(
			Object.keys(sensor).some(
				(key) =>
					sensor[key as keyof SensorDto] !==
					updateData[key as keyof SensorDto]
			)
		);
	}, [updateData]);

	const saveUpdate = async () => {
		await updateSensor([updateData], sensor.id);
		setIsEditing(false);
	};

	return (
		<Dialog>
			<DialogTrigger>
				<Settings />
			</DialogTrigger>
			<DialogContent className="w-[95%] md:w-2/3 px-10 pt-10">
				<div className="flex flex-col gap-4 pl-2 pb-4">
					<h2 className="text-lg font-medium">{t("sensorsDialog.editSensor")}</h2>
					<div className="flex flex-col gap-2 ">
						{Object.entries(updateData)
							.filter(
								([key]) =>
									![
										"id",
										"serialnumber",
										"measurements",
										"isattached",
										"type",
									].includes(key.toLowerCase())
							)
							.map(([key, value], index) => (
								<InputGroup
									key={index}
									type={
										key === "measurementInterval"
											? "time"
											: "text"
									}
									value={value}
									onChange={(e) =>
										setPartialChange({
											id: key,
											value: e.target.value,
										})
									}
									id={key}
									label={
										key.charAt(0).toUpperCase() +
										key
											.slice(1)
											.split(/(?=[A-Z])/)
											.join(" ")
											.toLowerCase()
									}
									orientation={orientationOpts.horizontal}
									isEditing={true}
								/>
							))}
					</div>

					<div
						className={`flex gap-2 transition-opacity duration-300 mr-2 ml-auto ${
							isEditing ? "opacity-100" : "opacity-0"
						}`}
					>
						<Button
							variant="secondary"
							onClick={() => {
								setUpdateData(sensor);
							}}
						>
							{t("sensorsDialog.cancel")}
						</Button>
						<Button variant="blue" onClick={saveUpdate}>
            {t("sensorsDialog.save")}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
