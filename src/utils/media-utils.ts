import { load } from 'cheerio';
import { v4 as uuidv4 } from 'uuid';

import { IMedia } from 'src/interfaces/media-interfaces';
import { getDownloadInstagramMediaBlob } from 'src/services/media-download-services';

export const downloadMediaFile = (downloadURL: string) => {
  const downloadLink = document.createElement('a');
  downloadLink.href = downloadURL;
  downloadLink.download = uuidv4();
  downloadLink.click();
};

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
    const blobFile = await getDownloadInstagramMediaBlob(previewURL);
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
