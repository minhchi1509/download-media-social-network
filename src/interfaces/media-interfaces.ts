export interface IMediaDetail {
  previewURL: string;
  downloadURL: string;
}
export interface IMedia {
  type: 'image' | 'video' | 'videoNotPlay';
  image?: IMediaDetail;
  video?: IMediaDetail;
  audio?: Pick<IMediaDetail, 'downloadURL'>;
}

export interface IDownloadFacebookMediaBodyRequest {
  q: string;
  html?: string;
}

export interface IDownloadFacebookMediaResponse {
  data: string;
  mess?: string;
}

export interface IDownloadDouyinMediaBodyRequest {
  url: string;
}

export interface IDownloadTiktokMediaParamsRequest {
  url: string;
  hd: number;
}
