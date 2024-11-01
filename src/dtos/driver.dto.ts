export interface DriverDto {
    id: number;
	downloadUrl: string;
	marketplaceBannerUrl: string;
    alias: string;
}

export interface UploadDriverDto {
	downloadUrl: string;
	marketplaceBanner: File | null;
    alias: string;
}
