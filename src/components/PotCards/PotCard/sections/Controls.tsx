import { Dispatch, SetStateAction } from "react";
//import { updateControllSetting } from "../../../../api/requests";
import { tabOptions } from "../PotCard";
import { ControlDtoWithEditing } from "../tabs/InfoTab";
import { useTranslation } from "react-i18next";

export const Controls = ({
	//updateData,
	//setUpdateData,
	setTab,
}: {
	updateData: ControlDtoWithEditing[];
	setUpdateData: (newData: ControlDtoWithEditing[]) => void;
	cancelUpdate: () => void;
	setTab: Dispatch<SetStateAction<tabOptions>>;
}) => {
	const { t } = useTranslation();
	// const saveUpdate = async () => {
	// 	await updateControllSetting(updateData);

	// 	const newData = updateData.map((x) => ({ ...x, isEditing: false }));

	// 	setUpdateData(newData);
	// };

	// const editStateHandler = (serialNumber: string) => {
	// 	const newData = updateData.map((control) =>
	// 		control.serialNumber === serialNumber
	// 			? { ...control, isEditing: !control.isEditing }
	// 			: control
	// 	);

	// 	setUpdateData(newData);
	// };
	// const updateControlValue = <K extends keyof ControlDtoWithEditing>(
	// 	serialNumber: string,
	// 	path: string[],
	// 	value: ControlDtoWithEditing[K]
	// ) => {
	// 	const newData = updateData.map((control) => {
	// 		if (control.serialNumber === serialNumber) {
	// 			let updatedControl = { ...control };
	// 			let currentLevel: any = updatedControl;

	// 			for (let i = 0; i < path.length - 1; i++) {
	// 				const key = path[i];
	// 				if (!currentLevel[key]) {
	// 					currentLevel[key] = {}; // Create the nested structure if it doesn't exist
	// 				}
	// 				currentLevel = currentLevel[key];
	// 			}

	// 			const finalKey = path[path.length - 1];
	// 			let parsedValue;

	// 			if (Array.isArray(value)) {
	// 				parsedValue = value;
	// 			} else {
	// 				parsedValue = !isNaN(Number(value)) ? Number(value) : value;
	// 			}

	// 			currentLevel[finalKey] = parsedValue;

	// 			return updatedControl;
	// 		}
	// 		return control;
	// 	});

	// 	setUpdateData(newData);
	// };

	return (
		<div className="pl-3 flex flex-col justify-between h-full pb-5">
			<div className="flex flex-col gap-[2%] h-full pb-2">
				<h2 className="text-lg font-medium flex gap-[1%] items-center border-b pb-2 mb-4 pl-2">
					{" "}
					{t("potCard.controls")}
				</h2>

				{/* <ul className="py-4 pr-4 h-full overflow-auto mb-1">
					{updateData?.map((x) => (
						<ControlCard
							control={x}
							key={x.serialNumber}
							isEditing={x.isEditing}
							editStateHandler={editStateHandler}
							updateControlValue={updateControlValue}
						/>
					))}
				</ul> */}

				<p className="text-muted-foreground m-auto">
					{t("potCard.comingSoon")}...
				</p>
			</div>

			<p
				className="text-sm hover:underline hover:text-black text-muted-foreground transition-all duration-100"
				onClick={() => setTab(tabOptions.advancedSettings)}
			>
				{t("potCard.advancedSettings")}
			</p>
		</div>
	);
};
