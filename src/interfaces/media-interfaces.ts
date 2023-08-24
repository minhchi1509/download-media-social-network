export interface IMediaDetail {
  previewURL: string;
  downloadURL: string;
}
export interface IMedia {
  type: 'image' | 'video';
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
