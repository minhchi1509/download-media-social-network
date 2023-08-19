import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Image,
  Input,
  Text,
  Textarea
} from '@chakra-ui/react';
import { useState } from 'react';

import { InstagramLogo } from 'src/assets/images';
import { getInstagramPostId } from 'src/utils/common-utils';

const InstgramDownload = () => {
  const [jsonDataPost, setJsonDataPost] = useState<any>();
  const [jsonDataURLOfPost, setjsonDataURLOfPost] = useState<string>('');

  const handleChangePostUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    const postId = getInstagramPostId(event.target.value);
    setjsonDataURLOfPost(
      postId! ? `https://www.instagram.com/p/${postId}/?__a=1&__d=dis` : ''
    );
  };

  const handleGetPostData = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const jsonData = JSON.parse(event.target.value);
    setJsonDataPost(jsonData);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" gap={3} alignItems="center">
        <Image src={InstagramLogo} alt="Instagram-Logo" width={8} height={8} />
        <Text fontSize="2xl" fontWeight="bold">
          Instagram
        </Text>
      </Box>
      <Alert status="warning" borderRadius={10}>
        <AlertIcon />
        Hãy đảm bảo rằng bạn đã đăng nhập tài khoản Instgram trên trình duyệt!
      </Alert>
      <Text fontSize="medium" fontWeight="medium">
        Bước 1: Dán đường link bài viết vào đây. Hãy đảm bảo link bài viết là
        hợp lệ
      </Text>
      <Input placeholder="Link bài viết" onChange={handleChangePostUrl} />
      <Text fontSize="medium" fontWeight="medium">
        Bước 2: Mở đường link dưới đây
      </Text>
      <Box display="flex" gap={2}>
        <Input
          value={jsonDataURLOfPost}
          onChange={() => {}}
          disabled
          sx={{ _disabled: { color: 'grey' } }}
        />
        <Button
          colorScheme="teal"
          onClick={() => window.open(jsonDataURLOfPost, '_blank')}
        >
          Mở
        </Button>
      </Box>
      <Text fontSize="medium" fontWeight="medium">
        Bước 3: Dán toàn bộ nội dung của link vừa mở vào đây. Hãy đảm bảo dán
        đầy đủ tất cả nội dung từ link đó!
      </Text>
      <Textarea
        placeholder="Dán nội dung vào đây"
        resize="none"
        height={150}
        onChange={handleGetPostData}
      />
    </Box>
  );
};

export default InstgramDownload;
