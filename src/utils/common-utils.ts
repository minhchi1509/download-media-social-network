export const downloadMediaFile = (blobFile: Blob) => {
  const fileURL = URL.createObjectURL(blobFile);
  const downloadLink = document.createElement('a');
  downloadLink.href = fileURL;
  downloadLink.download = 'minhchitest';
  downloadLink.click();
  URL.revokeObjectURL(fileURL);
};

export const getInstagramPostId = (postUrl: string) => {
  const regex = /\/(p|reel)\/([A-Za-z0-9-_]+)/;
  const match = postUrl.match(regex);
  if (match && match.length >= 3) {
    return match[2];
  }
  return undefined;
};
