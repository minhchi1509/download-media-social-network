import { AspectRatio, Box, Button, Image } from '@chakra-ui/react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { IMedia } from 'src/interfaces/media-interfaces';

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
        {mediaItem.type === 'image' || mediaItem.type === 'videoNotPlay' ? (
          <Image src={previewURL} objectFit="cover" />
        ) : (
          <video src={previewURL} controls />
        )}
      </AspectRatio>
      <Box padding={3} display="flex" gap={2}>
        <a
          href={downloadURL}
          target="_blank"
          download={uuidv4()}
          rel="noreferrer"
          style={{ flex: 1 }}
        >
          <Button width="100%" colorScheme="facebook">{`Tải ${
            mediaItem.type === 'image' ? 'ảnh' : 'video'
          }`}</Button>
        </a>
        {haveAudio && (
          <a
            href={mediaItem.audio?.downloadURL}
            target="_blank"
            download={uuidv4()}
            rel="noreferrer"
            style={{ flex: 1 }}
          >
            <Button width="100%" colorScheme="facebook">
              Tải MP3
            </Button>
          </a>
        )}
      </Box>
    </Box>
  );
};

export default MediaCard;
