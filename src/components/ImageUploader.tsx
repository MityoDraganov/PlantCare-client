import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

export const ImageUploader = ({
	onImageUpload,
}: {
	onImageUpload: (imageFile: File) => void;
}) => {
	const videoElementRef = useRef<HTMLVideoElement | null>(null);
	const [previewSrc, setPreviewSrc] = useState<string | null>(null);

	useEffect(() => {
		const video = videoElementRef.current;

		if (video) {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then((stream) => {
					video.srcObject = stream;
					video.play();
				})
				.catch((err) => {
					console.error("Error accessing camera:", err);
				});

			return () => {
				const tracks = (video.srcObject as MediaStream)?.getTracks();
				tracks?.forEach((track) => track.stop());
				video.srcObject = null;
			};
		}
	}, []);

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setPreviewSrc(URL.createObjectURL(file));
			onImageUpload(file);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center space-y-4 p-4 border border-green-500 rounded-lg bg-white shadow-md  aspect-[9/16] h-full w-full">
<div className="relative  w-full h-full border border-green-300 rounded-lg bg-green-50 overflow-hidden">
	<div className="relative w-full h-full overflow-hidden">
		<video
			ref={videoElementRef}
			className="object-cover w-full h-full"
			autoPlay
			playsInline
			muted
		/>
	</div>
	<Button className="absolute bottom-[15%] md:bottom-[18%] left-1/2 transform -translate-x-1/2 w-[18dvw] md:w-[5dvw] h-[18dvw] md:h-[5dvw] bg-white rounded-full border-4 border-gray-300 hover:border-gray-400 shadow-lg active:scale-95 transition-transform"></Button>
</div>


			<label
				htmlFor="file-upload"
				className="flex items-center justify-center w-full px-4 py-2 text-green-700 border border-green-500 rounded-lg cursor-pointer hover:bg-green-100"
			>
				<input
					id="file-upload"
					type="file"
					accept="image/*"
					className="hidden"
					onChange={handleFileInputChange}
				/>
				Upload Existing File
			</label>
		</div>
	);
};
