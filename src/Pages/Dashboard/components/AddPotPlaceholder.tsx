import { Check, Sprout } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { QRScanner } from "../../../components/QrComponent/QRScanner";
import { InputGroup } from "../../../components/InputGroup";
import useFormData from "../../../hooks/useForm";
import { useEffect, useState } from "react";
import { potData } from "../../../Interfaces/Pot.interface";


export const AddPotPlaceholder = () => {
	const [isScanned, setIsScanned] = useState<boolean>(false); // New state for tracking scan
	const [potData, setPotData] = useFormData<potData>({
        token: "",
		alias: "",
	});

    useEffect(() => {
        console.log(potData);
        
    }, [potData])
	return (
		<Dialog>
			<DialogTrigger>
				<Card className="min-w-[20dvw] h-full pt-6 hover:bg-primary-foreground shadow-sm hover:shadow-md hover:cursor-pointer">
					<CardContent className="w-full h-full flex flex-col items-center justify-center">
						<Sprout />
						<p className="break-keep">Add Crop Pot</p>
					</CardContent>
				</Card>
			</DialogTrigger>

			<DialogContent>
				<div>
					<label>Scan pot's QR:</label>
					<div className="relative">
						<div
							className={`transition duration-2000 ${
								isScanned ? "opacity-0" : "opacity-100"
							}`}
						>
							<QRScanner
								setScannedText={(e) => setPotData({ id: "token", value: e })}
								setIsScanned={setIsScanned}
								isScanned={isScanned}
							/>
						</div>
						{isScanned && (
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 flex items-center justify-center z-50 rounded-full bg-green-500 w-16 aspect-square ">
								<Check size={48} color="white" />
							</div>
						)}
					</div>
				</div>
				<InputGroup
					id="alias"
					label="Pot alias:"
					onChange={setPotData}
					value={potData.alias}
				/>
				<Button>Submit</Button>
			</DialogContent>
		</Dialog>
	);
};
