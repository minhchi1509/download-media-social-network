import { v4 as uuidv4 } from 'uuid';

export const downloadMediaFile = (blobFile: Blob) => {
  const fileURL = URL.createObjectURL(blobFile);
  const downloadLink = document.createElement('a');
  downloadLink.href = fileURL;
  downloadLink.download = uuidv4();
  downloadLink.click();
  URL.revokeObjectURL(fileURL);
};

export const getUnBlockedMediaUrl = (originUrl: any) => {
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
