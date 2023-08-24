import HttpRequest from 'src/config/HttpRequest-config';
import { IDownloadFacebookMediaResponse } from 'src/interfaces/media-interfaces';

export const getDownloadInstagramMediaBlob = async (url: string) => {
  const response = await HttpRequest.get<Blob>(url, { responseType: 'blob' });
  return response.data;
};

export const getDownloadFacebookMediaURL = async (body: FormData) => {
  const response = await HttpRequest.post<IDownloadFacebookMediaResponse>(
    `${import.meta.env.VITE_WORKER_URL}/${
      import.meta.env.VITE_FACEBOOK_MEDIA_DOWNLOAD_API_URL
    }`,
    body
  );
  return response.data;
};
