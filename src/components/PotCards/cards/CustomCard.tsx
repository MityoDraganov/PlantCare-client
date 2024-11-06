import * as React from "react";
import { Hammer, icons } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { ScrollArea } from "../../ui/scroll-area";
import { cn } from "../../../lib/utils";
import { InfoCard, InfoCardProps } from "./InfoCard";

type IconName = keyof typeof icons;

interface LucideIconPickerProps extends InfoCardProps{
	onSelectIcon: (iconName: IconName) => void;
	selectedIcon: IconName;
}
export const CustomCard = ({
	onSelectIcon,
	selectedIcon: initialSelectedIcon, // rename the prop for clarity
	isInDesignerMode,
	...props
}: LucideIconPickerProps) => {
	const [search, setSearch] = React.useState("");
	const [open, setOpen] = React.useState(false);
	const [selectedIcon, setSelectedIcon] = React.useState<IconName>(
		initialSelectedIcon || "Hammer"
	);

	const filteredIcons = React.useMemo(() => {
		return Object.keys(icons).filter((iconName) =>
			iconName.toLowerCase().includes(search.toLowerCase())
		) as IconName[];
	}, [search]);

	const SelectedIcon = icons[selectedIcon];

	const handleIconSelect = (iconName: IconName) => {
		setSelectedIcon(iconName); // Update local state with the selected icon
		onSelectIcon(iconName); // Call the passed in function to update parent if needed
		setOpen(false); // Close the popover
	};

	return (
		<InfoCard
			title={isInDesignerMode ? <Input className="w-1/2" placeholder="Card title..."/> : "Custom card"}
			icon={
				isInDesignerMode ? 
                <Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button variant="outline" className="justify-start">
							<SelectedIcon className="h-4 w-4" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-0">
						<div className="p-4 pb-0">
							<Input
								placeholder="Search icons..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="mb-2"
							/>
						</div>
						<ScrollArea className="h-72">
							<div className="grid grid-cols-4 gap-2 p-4">
								{filteredIcons.map((iconName) => {
									const Icon = icons[iconName];
									return (
										<Button
											key={iconName}
											variant="ghost"
											className={cn(
												"h-12 w-12 p-0",
												selectedIcon === iconName &&
													"bg-muted"
											)}
											onClick={() => handleIconSelect(iconName)}
										>
											<Icon className="h-6 w-6"/>
										</Button>
									);
								})}
							</div>
						</ScrollArea>
					</PopoverContent>
				</Popover>
                : <Hammer />
			}
			isInDesignerMode={isInDesignerMode}
			{...props}
		/>
	);
};
