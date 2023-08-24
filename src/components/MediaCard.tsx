import { AspectRatio, Box, Button, Image } from '@chakra-ui/react';
import React from 'react';

import { IMedia } from 'src/interfaces/media-interfaces';
import { downloadMediaFile } from 'src/utils/media-utils';

interface IMediaCardProps {
  mediaItem: IMedia;
}

const MediaCard: React.FC<IMediaCardProps> = ({ mediaItem }) => {
  const haveAudio = mediaItem.audio;
  const previewURL = mediaItem.image?.previewURL || mediaItem.video?.previewURL;
  const downloadURL =
    mediaItem.image?.downloadURL || mediaItem.video?.downloadURL;

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
          <Image src={previewURL} objectFit="cover" />
        ) : (
          <video src={previewURL} controls />
        )}
      </AspectRatio>
      <Box padding={3} display="flex" gap={2}>
        <Button
          flex={1}
          colorScheme="facebook"
          onClick={() => downloadMediaFile(downloadURL!)}
        >{`Tải ${mediaItem.type === 'image' ? 'ảnh' : 'video'}`}</Button>
        {haveAudio && (
          <Button
            flex={1}
            colorScheme="facebook"
            onClick={() =>
              downloadMediaFile(mediaItem.audio?.downloadURL as string)
            }
          >
            Tải MP3
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default MediaCard;
