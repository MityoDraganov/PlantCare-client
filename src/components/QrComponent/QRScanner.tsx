import QrScanner from "qr-scanner";
import { Dispatch, useEffect, useRef } from "react";

export const QRScanner = ({
	setScannedText,
	setIsScanned,
	isScanned,
}: {
	setScannedText: Dispatch<React.SetStateAction<string>>;
	setIsScanned: Dispatch<React.SetStateAction<boolean>>;
	isScanned: boolean;
}) => {
	const videoElementRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		const video = videoElementRef.current;

		if (video) {
			const qrScanner = new QrScanner(
				video,
				(result) => {
					setScannedText(result.data);
					setIsScanned(true);
				},
				{
					returnDetailedScanResult: true,
					highlightScanRegion: true,
					highlightCodeOutline: true,
				}
			);
			qrScanner.start();

			return () => {
				qrScanner.stop();
				qrScanner.destroy();
			};
		}
	}, []);

	return (
		<div>
			<div>
				<video ref={videoElementRef} />
			</div>
		</div>
	);
};
