import { AspectRatio, Box, Button, Image } from '@chakra-ui/react';
import React from 'react';

import { useShowToast } from 'src/hooks/useShowToast';
import { IMediaDetail } from 'src/interfaces/media-interfaces';
import { downloadMediaFile } from 'src/utils/common-utils';

interface IMediaCardProps {
  mediaItem: IMediaDetail;
}

const MediaCard: React.FC<IMediaCardProps> = ({ mediaItem }) => {
  const { showToast } = useShowToast();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const response = await fetch(mediaItem.url);
      const blobFile = await response.blob();
      downloadMediaFile(blobFile);
      showToast('success', 'Tải xuống thành công!');
    } catch (error) {
      showToast('error', 'Đã có lỗi xảy ra trong quá trình tải!');
    } finally {
      setLoading(false);
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
          <Image src={mediaItem.url} objectFit="cover" />
        ) : (
          <video src={mediaItem.url} controls />
        )}
      </AspectRatio>
      <Box padding={3}>
        <Button
          colorScheme="facebook"
          width="100%"
          onClick={handleDownload}
          isLoading={loading}
          loadingText="Đang tải xuống"
        >{`Tải ${mediaItem.type === 'image' ? 'ảnh' : 'video'}`}</Button>
      </Box>
    </Box>
  );
};

export default MediaCard;
