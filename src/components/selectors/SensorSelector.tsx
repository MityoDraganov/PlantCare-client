import { useContext, useEffect, useMemo, useState } from "react";
import { SensorDto } from "../../dtos/sensors.dto";
import { MultiSelect } from "../ui/multi-select";
import { PotContext } from "../../contexts/PotContext";

export const SensorSelector = ({
	selectedSensors,
	onChange,
	isEditing,
}: {
	selectedSensors: SensorDto[];
	onChange: (newSensors: SensorDto[]) => void;
	isEditing: boolean;
}) => {
	const [potSensors, setPotSensors] = useState<SensorDto[] | undefined>(undefined);

	const { selectedPot } = useContext(PotContext);

	useEffect(() => {
		if (selectedPot) {
			setPotSensors(selectedPot.sensors);
		}
	}, [selectedPot]);

	const options = useMemo(() => {
		if (potSensors) {
			return potSensors.map(sensor => ({
				label: sensor.alias,
				value: sensor.id.toString(),
			}));
		}
		return [];
	}, [potSensors]);

	const selectedValues = useMemo(() => {
		return selectedSensors.map(sensor => sensor.id.toString());
	}, [selectedSensors]);

	const handleValueChange = (newValues: string[]) => {
		if (potSensors) {
			const newSelectedSensors = potSensors.filter(sensor =>
				newValues.includes(sensor.id.toString())
			);
			onChange(newSelectedSensors);
		}
	};

	if (options.length === 0) {
		return null; // Render nothing if options are not available
	}

	return (
		<MultiSelect
			options={options}
			onValueChange={handleValueChange}
			defaultValue={selectedValues}
			placeholder="Select sensors"
			variant="default"
			animation={0.2}
			className="w-fit"
			disabled={!isEditing}
		/>
	);
};
