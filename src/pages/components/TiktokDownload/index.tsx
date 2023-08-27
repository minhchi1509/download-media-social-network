import { Box, Button } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';

import Input from 'src/components/Input';
import MediaCard from 'src/components/MediaCard';
import { useShowToast } from 'src/hooks/useShowToast';
import { IMedia } from 'src/interfaces/media-interfaces';
import { getDownloadTiktokMediaResponse } from 'src/services/media-download-services';
import { formatTiktokMediaData } from 'src/utils/media-utils';
import { douyinFormValidation } from 'src/utils/validation-utils';

const TiktokDownload = () => {
  const { showToast } = useShowToast();
  const [isGettingData, setIsGettingData] = React.useState<boolean>(false);
  const [mediaList, setMediaList] = React.useState<IMedia[]>([]);

  const handleSubmitForm = async (values: { postURL: string }) => {
    const url = values.postURL;
    try {
      setIsGettingData(true);
      const data = await getDownloadTiktokMediaResponse({ url, hd: 1 });
      const videoURL = data.hdplay || data.play || data.wmplay;
      const audioURL = data.music;
      const mediaItem = await formatTiktokMediaData(videoURL, audioURL);
      setMediaList([mediaItem]);
      showToast('success', 'Lấy dữ liệu thành công!');
    } catch (error) {
      showToast('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu!');
    } finally {
      setIsGettingData(false);
    }
  };

  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      postURL: ''
    },
    validationSchema: douyinFormValidation,
    onSubmit: handleSubmitForm
  });

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Input
        label="Bước 1: Dán đường link bài viết vào đây. Hãy đảm bảo link bài viết là
        hợp lệ"
        placeholder="Link bài viết"
        onChange={handleChange}
        name="postURL"
        value={values.postURL}
        errorText={touched.postURL && errors.postURL}
      />
      <Button
        colorScheme="purple"
        onClick={() => handleSubmit()}
        isLoading={isGettingData}
        loadingText="Đang lấy dữ liệu"
      >
        Lấy dữ liệu
      </Button>
      <Box
        display="flex"
        gap={3}
        mt={3}
        flexWrap="wrap"
        justifyContent="space-evenly"
      >
        {mediaList.map((media, index) => (
          <MediaCard mediaItem={media} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default TiktokDownload;
