import HttpRequest from 'src/config/HttpRequest-config';
import {
  IDownloadDouyinMediaBodyRequest,
  IDownloadFacebookMediaResponse,
  IDownloadTiktokMediaParamsRequest
} from 'src/interfaces/media-interfaces';

export const convertToBlobFile = async (url: string) => {
  const response = await HttpRequest.get<Blob>(url, { responseType: 'blob' });
  return response.data;
};

export const getDownloadFacebookMediaResponse = async (body: FormData) => {
  const response = await HttpRequest.post<IDownloadFacebookMediaResponse>(
    `${import.meta.env.VITE_WORKER_URL}/${
      import.meta.env.VITE_FACEBOOK_MEDIA_API_URL
    }`,
    body
  );
  return response.data;
};

export const getDownloadDouyinMediaResponse = async (
  body: IDownloadDouyinMediaBodyRequest
) => {
  const response = await HttpRequest.post(
    import.meta.env.VITE_DOUYIN_MEDIA_API_URL,
    body,
    {
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY_FOR_DOUYIN
      }
    }
  );
  return response.data;
};

export const getDownloadTiktokMediaResponse = async (
  params: IDownloadTiktokMediaParamsRequest
) => {
  const response = await HttpRequest.get(
    import.meta.env.VITE_TIKTOK_MEDIA_API_URL,
    {
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY_FOR_TIKTOK
      },
      params
    }
  );
  return response.data.data;
};
