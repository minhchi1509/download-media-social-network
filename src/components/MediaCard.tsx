import { AspectRatio, Box, Button, Image } from '@chakra-ui/react';
import React from 'react';

import { useShowToast } from 'src/hooks/useShowToast';
import { IMedia, IMediaDetail } from 'src/interfaces/media-interfaces';
import { downloadMediaFile } from 'src/utils/media-utils';

interface IMediaCardProps {
  mediaItem: IMedia;
}

const MediaCard: React.FC<IMediaCardProps> = ({ mediaItem }) => {
  const { showToast } = useShowToast();
  const haveAudio = mediaItem.audio;
  const [isDownloadingImageOrMp4, setIsDownloadingImageOrMp4] =
    React.useState<boolean>(false);
  const [isDownloadingAudio, setIsDownloadingAudio] =
    React.useState<boolean>(false);

  const handleDownload = async (
    isAudio: boolean,
    mediaDetail: IMediaDetail
  ) => {
    try {
      isAudio ? setIsDownloadingAudio(true) : setIsDownloadingImageOrMp4(true);
      if (mediaDetail.isDirectlyDownloadFromURL) {
        downloadMediaFile(mediaDetail.url);
      } else {
        const response = await fetch(mediaDetail.url);
        const blobFile = await response.blob();
        downloadMediaFile(blobFile);
      }
      showToast('success', 'Tải xuống thành công!');
    } catch (error) {
      showToast('error', 'Đã có lỗi xảy ra trong quá trình tải!');
    } finally {
      setIsDownloadingAudio(false);
      setIsDownloadingImageOrMp4(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 360,
        borderWidth: 1,
        borderColor: 'blackAlpha.400',
        borderRadius: 16,
        overflow: 'hidden'
      }}
    >
      <AspectRatio height={360} ratio={1}>
        {mediaItem.type === 'image' ? (
          <Image src={mediaItem.image?.url} objectFit="cover" />
        ) : (
          <video src={mediaItem.video?.url} controls />
        )}
      </AspectRatio>
      <Box padding={3} display="flex" gap={2}>
        <Button
          flex={1}
          colorScheme="facebook"
          onClick={() =>
            handleDownload(false, (mediaItem.image || mediaItem.video)!)
          }
          isLoading={isDownloadingImageOrMp4}
          loadingText="Đang tải xuống"
        >{`Tải ${mediaItem.type === 'image' ? 'ảnh' : 'video'}`}</Button>
        {haveAudio && (
          <Button
            flex={1}
            colorScheme="facebook"
            onClick={() => handleDownload(true, mediaItem.audio!)}
            isLoading={isDownloadingAudio}
            loadingText="Đang tải xuống"
          >
            Tải MP3
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default MediaCard;
