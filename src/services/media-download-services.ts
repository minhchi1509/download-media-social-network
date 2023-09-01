import HttpRequest from 'src/config/HttpRequest-config';
import {
  IGetDouyinMediaBodyRequest,
  IGetFacebookMediaResponse,
  IGetStoryInstagramApiUrlResponse,
  IGetTiktokMediaParamsRequest
} from 'src/interfaces/media-interfaces';

export const getInstagramStoryAPIURL = async (body: FormData) => {
  const response = await HttpRequest.post<IGetStoryInstagramApiUrlResponse>(
    `${import.meta.env.VITE_WORKER_URL}/${
      import.meta.env.VITE_INSTAGRAM_STORY_API_URL
    }`,
    body
  );
  return response.data;
};

export const getFacebookMedia = async (body: FormData) => {
  const response = await HttpRequest.post<IGetFacebookMediaResponse>(
    `${import.meta.env.VITE_WORKER_URL}/${
      import.meta.env.VITE_FACEBOOK_MEDIA_API_URL
    }`,
    body
  );
  return response.data;
};

export const getDouyinMedia = async (body: IGetDouyinMediaBodyRequest) => {
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

export const getTiktokMedia = async (params: IGetTiktokMediaParamsRequest) => {
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
