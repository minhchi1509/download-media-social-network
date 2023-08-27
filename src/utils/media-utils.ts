import { load } from 'cheerio';

import { IMedia } from 'src/interfaces/media-interfaces';
import { convertToBlobFile } from 'src/services/media-download-services';

export const getUnBlockedInstagramMediaUrl = (originUrl: any) => {
  const newUrl = new URL(originUrl);
  newUrl.hostname = 'scontent.cdninstagram.com';
  return `${import.meta.env.VITE_WORKER_URL}/${newUrl.toString()}`;
};

export const getInstagramAPIURL = (postUrl: string) => {
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
  data: any
): Promise<IMedia[]> => {
  let results: IMedia[] = [];

  const getMediaDetail = async (media: any): Promise<IMedia> => {
    const type = media.media_type === 1 ? 'image' : 'video';
    const previewURL = getUnBlockedInstagramMediaUrl(
      type === 'image'
        ? media.image_versions2.candidates[0].url
        : media.video_versions[0].url
    );
    const blobFile = await convertToBlobFile(previewURL);
    const downloadURL = URL.createObjectURL(blobFile);
    return {
      type,
      [type]: { downloadURL, previewURL }
    };
  };

  results =
    data.carousel_media !== undefined
      ? [
          ...(await Promise.all(
            data.carousel_media.map((media: any) => getMediaDetail(media))
          ))
        ]
      : [await getMediaDetail(data)];

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
