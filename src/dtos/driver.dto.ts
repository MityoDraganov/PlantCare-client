import { UserResponseDto } from "./user.dto";

export interface DriverDto {
	id: number;
	downloadUrl: string;
	marketplaceBannerUrl: string;
	alias: string;
	user: UserResponseDto;
	isUploader: boolean;
}

export interface UploadDriverDto {
	downloadUrl: string;
	marketplaceBanner: File | null;
	alias: string;
}
