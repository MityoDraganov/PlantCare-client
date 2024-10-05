import { Button } from "./ui/button";

export const EditBtnsComponent = ({
    saveUpdate,
	cancelUpdate,
    isEditing,
}: {
    saveUpdate: () => void;
	cancelUpdate: () => void;
    isEditing: boolean;
}) => {
	return (
		<div
			className={`flex gap-2 transition-opacity duration-300 ${
				isEditing
					? "opacity-100"
					: "opacity-0"
			}`}
		>
			<Button variant="secondary" onClick={cancelUpdate}>
				Cancel
			</Button>
			<Button variant="blue" onClick={saveUpdate}>
				Save
			</Button>
		</div>
	);
};
