import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";

export const ImageUploader = ({
  onImageUpload,
}: {
  onImageUpload: (imageFile: File) => void;
}) => {
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const startCamera = (facingMode: "user" | "environment") => {
    const video = videoElementRef.current;

    if (video) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode } })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.error("Error accessing camera:", err);
        });
    }
  };

  useEffect(() => {
    startCamera(facingMode);

    return () => {
      const video = videoElementRef.current;
      if (video && video.srcObject) {
        const tracks = (video.srcObject as MediaStream)?.getTracks();
        tracks?.forEach((track) => track.stop());
        video.srcObject = null;
      }
    };
  }, [facingMode]);

  const handleTakePicture = () => {
    const video = videoElementRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (blob) {
            const timestamp = new Date().getTime();
            const file = new File([blob], `captured-image-${timestamp}.jpg`, {
              type: "image/jpeg",
            });
            const url = URL.createObjectURL(file);
            setPreviewSrc(url);
            onImageUpload(file);
          }
        }, "image/jpeg");
      }
    }
  };

  const handleRotateCamera = () => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white shadow-md aspect-[9/16] h-full w-full">
      <div className="relative w-full h-full rounded-lg bg-green-50 overflow-hidden">
        <div className="relative w-full h-full overflow-hidden">
          <video
            ref={videoElementRef}
            className="object-cover w-full h-full"
            autoPlay
            playsInline
            muted
          />
        </div>
        <div className="absolute bottom-6 -left-[10%] right-0 flex items-center justify-center gap-6">
          <Button
            onClick={handleRotateCamera}
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/50 p-3 text-white hover:bg-black/70"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
          <Button
            onClick={handleTakePicture}
            className="transform w-[18dvw] md:w-[5dvw] h-[18dvw] md:h-[5dvw] bg-white rounded-full border-4 border-gray-300 hover:border-gray-400 shadow-lg active:scale-95 transition-transform"
          >
  
          </Button>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {previewSrc && (
        <div className="mt-4">
          <img
            src={previewSrc}
            alt="Captured Preview"
            className="w-32 h-32 object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
};
