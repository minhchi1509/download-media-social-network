import { load } from 'cheerio';

import HttpRequest from 'src/config/HttpRequest-config';
import { IMedia, TMediaType } from 'src/interfaces/media-interfaces';

export const convertToBlobFile = async (url: string) => {
  const response = await HttpRequest.get<Blob>(url, { responseType: 'blob' });
  return response.data;
};

export const convertToMediaObject = async (
  type: TMediaType,
  previewURL: string,
  haveAudio = false,
  audioOriginURL = ''
): Promise<IMedia> => {
  const downloadURL = URL.createObjectURL(await convertToBlobFile(previewURL));
  let results: IMedia = {
    type,
    [type === 'video' ? 'video' : 'image']: {
      downloadURL,
      previewURL
    }
  };
  if (haveAudio) {
    const downloadAudioURL = URL.createObjectURL(
      await convertToBlobFile(audioOriginURL)
    );
    results = { ...results, audio: { downloadURL: downloadAudioURL } };
  }
  return results;
};

export const getUnBlockedInstagramMediaUrl = (originUrl: string) => {
  const newUrl = new URL(originUrl);
  newUrl.hostname = 'scontent.cdninstagram.com';
  return `${import.meta.env.VITE_WORKER_URL}/${newUrl.toString()}`;
};

export const getInstagramPostAPIURL = (postUrl: string) => {
  const regex = /\/(p|reel)\/([A-Za-z0-9-_]+)/;
  const match = postUrl.match(regex);
  if (match && match.length >= 3) {
    return `https://www.instagram.com/p/${match[2]}/?__a=1&__d=dis`;
  }
  return '';
};

export const getDouyinMediaURL = (originURL: string) => {
  const regex = /(https:\/\/[^\s]+)/;
  const match = originURL.match(regex);
  return match?.[0] || '';
};

export const formatInstagramMediaData = async (
  mediaBelongsTo: 'post' | 'story',
  data: any
): Promise<IMedia[]> => {
  let results: IMedia[] = [];
  if (mediaBelongsTo === 'post') {
    const targetData = data.items[0];
    if (
      !targetData.carousel_media &&
      !targetData.image_versions2.candidates[0].url &&
      !targetData.video_versions[0].url
    ) {
      throw new Error('Can not find media');
    }
    //Nếu bài viết có từ 2 ảnh/video trở lên
    if (targetData.carousel_media) {
      results = await Promise.all(
        targetData.carousel_media.map((mediaItem: any) => {
          const type = mediaItem.media_type === 1 ? 'image' : 'video';
          const previewURL = getUnBlockedInstagramMediaUrl(
            type === 'image'
              ? mediaItem.image_versions2.candidates[0].url
              : mediaItem.video_versions[0].url
          );
          return convertToMediaObject(type, previewURL);
        })
      );
    } else {
      const type = targetData.media_type === 1 ? 'image' : 'video';
      const previewURL = getUnBlockedInstagramMediaUrl(
        type === 'image'
          ? targetData.image_versions2.candidates[0].url
          : targetData.video_versions[0].url
      );
      results = [await convertToMediaObject(type, previewURL)];
    }
  } else {
    const storyMediaList = data?.data?.reels_media[0]?.items;
    if (!storyMediaList) {
      throw new Error('Can not find media');
    }
    results = await Promise.all(
      storyMediaList.map((mediaItem: any) => {
        const type = mediaItem.is_video ? 'video' : 'image';
        const previewURL = getUnBlockedInstagramMediaUrl(
          type === 'video'
            ? mediaItem.video_resources[0].src
            : mediaItem.display_url
        );
        return convertToMediaObject(type, previewURL);
      })
    );
  }
  return results;
};

export const formatFacebookMediaData = (data: string): IMedia => {
  const JSONFormat = JSON.stringify(data);
  const decodeHTML = JSON.parse(JSONFormat);
  const $ = load(decodeHTML);

  const videoURL =
    $($('a.download-link-fb')[0]).attr('href')?.replaceAll('&amp;', '&') || '';
  const audioURL =
    $($('input#audioUrl')[0]).attr('value')?.replaceAll('&amp;', '&') || '';

  const originObjectVideoURL = new URL(videoURL);
  originObjectVideoURL.searchParams.delete('dl');
  const videoPreviewURL = originObjectVideoURL.toString();
  originObjectVideoURL.searchParams.append('dl', '1');
  const videoDownloadURL = originObjectVideoURL.toString();
  let audio = undefined;
  if (audioURL) {
    const originObjectAudioURL = new URL(audioURL);
    originObjectAudioURL.searchParams.append('dl', '1');
    const audioDownloadURL = originObjectAudioURL.toString();
    audio = {
      downloadURL: audioDownloadURL
    };
  }
  return {
    type: 'video',
    video: { previewURL: videoPreviewURL, downloadURL: videoDownloadURL },
    audio
  };
};

export const formatDouyinMediaData = async (data: any): Promise<IMedia[]> => {
  let results: IMedia[] = [];

  const audioDownloadURL = URL.createObjectURL(
    await convertToBlobFile(
      data.music.play_url.url_list[0] ||
        JSON.parse(data.music.extra).original_song_url
    )
  );

  const getImageMediaDetail = async (media: any): Promise<IMedia> => {
    const previewURL = media.url_list.pop();
    const blobFile = await convertToBlobFile(previewURL);
    const downloadURL = URL.createObjectURL(blobFile);
    return {
      type: 'image',
      image: { previewURL, downloadURL }
    };
  };

  if (data.media_type === 4) {
    results = [
      {
        type: 'videoNotPlay',
        video: {
          previewURL: data.video.origin_cover.url_list.pop(),
          downloadURL: data.video.play_addr.url_list[0]
        }
      }
    ];
  } else {
    results = [
      ...(await Promise.all(
        data.images.map((image: any) => getImageMediaDetail(image))
      ))
    ];
  }
  return results.map((res) => ({
    ...res,
    audio: { downloadURL: audioDownloadURL }
  }));
};

export const formatTiktokMediaData = async (
  videoURL: string,
  audioURL: string
): Promise<IMedia> => {
  const videoDownloadURL = URL.createObjectURL(
    await convertToBlobFile(videoURL)
  );
  const audioDownloadURL = URL.createObjectURL(
    await convertToBlobFile(audioURL)
  );
  return {
    type: 'video',
    video: { previewURL: videoURL, downloadURL: videoDownloadURL },
    audio: { downloadURL: audioDownloadURL }
  };
};
