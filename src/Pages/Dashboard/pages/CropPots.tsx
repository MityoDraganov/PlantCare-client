import { useEffect, useState } from "react";
import { getAllPots } from "../../../api/requests";
import { CropPotResponseDto } from "../../../dtos/CropPot.dto";
import toast from "react-hot-toast";
import { PotCard } from "../../../components/PotCards/PotCard";

export const CropPots = () => {
	const [pots, setPots] = useState<CropPotResponseDto[]>();
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		(async () => {
			try {
				const data = await getAllPots();
                console.log(data);
                
				setPots(data);
			} catch (err) {
				toast.error("Failed to fetch pots.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return (
		<div className="h-full w-full grid grid-cols-3 gap-6">
			{pots?.length ? pots.map((x: CropPotResponseDto) => <PotCard {...x}/>) : <p>No pots available</p>}

		</div>
	);
};
