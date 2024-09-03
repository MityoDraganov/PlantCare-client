import { Days } from "../dtos/controls.dto";
import { MultiSelect } from "./ui/multi-select";

export const DaySelector = ({
    selectedDays,
    onChange,
    isEditing
}: {
    selectedDays: Days[];
    onChange: (newDays: Days[]) => void;
    isEditing: boolean;
}) => {
    // Define the options for the days of the week
    const dayOptions = Object.keys(Days).filter(key => isNaN(Number(key))).map(day => ({
        label: day,
        value: day as keyof typeof Days
    }));

    // Handle value change
    const handleValueChange = (newValues: string[]) => {
		console.log(Days[newValues[0] as keyof typeof Days])
        const newSelectedDays = newValues.map(value => Days[value as keyof typeof Days]);
        onChange(newSelectedDays);
    };

    return (
        <MultiSelect
            options={dayOptions}
            onValueChange={handleValueChange}
            defaultValue={selectedDays.map(day => Object.keys(Days).find(key => Days[key as keyof typeof Days] === day) as string)}
            placeholder="Select days"
            variant="default"
            animation={0.2}
            className="w-fit"
        />
    );
};
