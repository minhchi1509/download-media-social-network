import HttpRequest from 'src/config/HttpRequest-config';
import { IDownloadFacebookMediaResponse } from 'src/interfaces/media-interfaces';

export const getDownloadFacebookMediaURL = async (body: FormData) => {
  const response = await HttpRequest.post<IDownloadFacebookMediaResponse>(
    `${import.meta.env.VITE_WORKER_URL}/${
      import.meta.env.VITE_FACEBOOK_MEDIA_DOWNLOAD_API_URL
    }`,
    body
  );
  return response.data;
};
