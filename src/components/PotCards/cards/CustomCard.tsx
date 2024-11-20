import React, { useState } from "react";
import { Hammer, icons } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { ScrollArea } from "../../ui/scroll-area";
import { InfoCard, InfoCardProps } from "./InfoCard";
import { cn } from "../../../lib/utils";

export type IconName = keyof typeof icons;

interface LucideIconPickerProps extends InfoCardProps {
	onSelectIcon: (iconName: IconName) => void;
	onTitleChange?: (title: string) => void;
	selectedIcon: IconName;
	value?: number;
}

export const CustomCard = ({
	onSelectIcon,
	onTitleChange,
	selectedIcon: initialSelectedIcon,
	isInDesignerMode,
	value,
	...props
}: LucideIconPickerProps) => {
	const [search, setSearch] = useState("");
	const [open, setOpen] = useState(false);
	const [selectedIcon, setSelectedIcon] = useState<IconName>(
		initialSelectedIcon || "Hammer"
	);
	const [title, setTitle] = useState<string>();

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTitle = e.target.value;
		setTitle(newTitle);
		onTitleChange && onTitleChange(newTitle);
	};

	const handleIconChange = (iconName: string) => {
		setSelectedIcon(iconName as IconName);
		onSelectIcon && onSelectIcon(iconName as IconName);
	};

	const filteredIcons = React.useMemo(() => {
		return Object.keys(icons).filter((iconName) =>
			iconName.toLowerCase().includes(search.toLowerCase())
		) as IconName[];
	}, [search]);

	const SelectedIcon = icons[selectedIcon];

	return (
		<InfoCard
			title={
				isInDesignerMode ? (
					<Input
						value={title != "" ? title : "Custom card"}
						onChange={handleTitleChange}
						placeholder="Card title..."
						className="w-full"
					/>
				) : (
					title ? title : "Custom card"
				)
			}
			mainContent={value}
			icon={
				isInDesignerMode ? (
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
												onClick={() =>
													handleIconChange(iconName)
												}
											>
												<Icon className="h-6 w-6" />
											</Button>
										);
									})}
								</div>
							</ScrollArea>
						</PopoverContent>
					</Popover>
				) : (
					<Hammer />
				)
			}
			isInDesignerMode={isInDesignerMode}
			{...props}
		/>
	);
};
