export interface IMediaDetail {
  previewURL: string;
  downloadURL: string;
}

export type TMediaType = 'image' | 'video' | 'videoNotPlay';
export interface IMedia {
  type: TMediaType;
  image?: IMediaDetail;
  video?: IMediaDetail;
  audio?: Pick<IMediaDetail, 'downloadURL'>;
}

export interface IGetStoryInstagramApiUrlResponse {
  status: string;
  data: string;
}

export interface IGetFacebookMediaResponse {
  data: string;
  mess?: string;
}

export interface IGetDouyinMediaBodyRequest {
  url: string;
}

export interface IGetTiktokMediaParamsRequest {
  url: string;
  hd: number;
}
