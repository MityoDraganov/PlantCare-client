import { SensorDto } from "../../../../dtos/sensors.dto";
import { Chart } from "../../cards/Chart";

export const Sensors = ({ sensors }: { sensors: SensorDto[] }) => {
	return (
		<div className="md:border-r h-full md:border-gray-300 md:pr-6">
			<h2 className="text-lg font-medium flex gap-[1%] items-center border-b pb-2 mb-4  pl-2">
				{" "}
				Controls
			</h2>
			<div className="h-max">
				<Chart sensors={sensors} />
			</div>
		</div>
	);
};
