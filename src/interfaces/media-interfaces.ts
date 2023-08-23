export interface IMediaDetail {
  url: string;
  isDirectlyDownloadFromURL: boolean;
}
export interface IMedia {
  type: 'image' | 'video';
  image?: IMediaDetail;
  video?: IMediaDetail;
  audio?: IMediaDetail;
}

export interface IDownloadFacebookMediaBodyRequest {
  q: string;
  html?: string;
}

export interface IDownloadFacebookMediaResponse {
  data: string;
  mess?: string;
}
