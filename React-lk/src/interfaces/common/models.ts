import React from "react";

export interface CommonSettingsModel {
	maxPhotoCount: number;
	maxPhotoSize: number;
	maxThumbnailSize: number;
	smPretDesc: string | null;
	smReturnDesc: string | null;
	smFedBrakDesc: string | null;
	edrugEmail: string | null;
	useReadyDate: boolean;
}

export interface MainLayoutContextProps {
	visibleChoosePharmacy: boolean;
	setVisibleChoosePharmacy: React.Dispatch<React.SetStateAction<boolean>>;
}
