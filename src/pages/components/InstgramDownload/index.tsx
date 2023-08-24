/* eslint-disable @typescript-eslint/no-floating-promises */
import { Alert, AlertIcon, Box, Button } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';

import Input from 'src/components/Input';
import MediaCard from 'src/components/MediaCard';
import Textarea from 'src/components/Textarea';
import { useShowToast } from 'src/hooks/useShowToast';
import { IForm } from 'src/interfaces/form-interfaces';
import { IMedia } from 'src/interfaces/media-interfaces';
import {
  formatInstagramMediaData,
  getInstagramAPIURL
} from 'src/utils/media-utils';
import { instagramFormValidation } from 'src/utils/validation-utils';
import { instagramURLRegex } from 'src/variables/constants';

const InstgramDownload = () => {
  const { showToast } = useShowToast();
  const [isGettingData, setIsGettingData] = React.useState<boolean>(false);
  const [mediaList, setMediaList] = React.useState<IMedia[]>([]);

  const handleSubmitForm = async ({ jsonData }: IForm) => {
    try {
      setIsGettingData(true);
      const data = JSON.parse(jsonData).items[0];
      if (
        !data.carousel_media &&
        !data.image_versions2.candidates[0].url &&
        !data.video_versions[0].url
      ) {
        throw errors;
      }
      const mediaItems = await formatInstagramMediaData(data);
      setMediaList(mediaItems);
      showToast('success', 'Lấy dữ liệu thành công!');
    } catch (error) {
      showToast('error', 'Lấy dữ liệu thất bại. Vui lòng kiểm tra lại!');
    } finally {
      setIsGettingData(false);
    }
  };

  const { values, handleChange, handleSubmit, touched, errors, setFieldValue } =
    useFormik<IForm>({
      initialValues: {
        postURL: '',
        apiURL: '',
        jsonData: ''
      },
      validationSchema: instagramFormValidation,
      onSubmit: handleSubmitForm
    });

  React.useEffect(() => {
    if (instagramURLRegex.test(values.postURL.trim())) {
      setFieldValue('apiURL', getInstagramAPIURL(values.postURL));
    } else {
      setFieldValue('apiURL', '');
    }
  }, [values.postURL, touched.postURL, setFieldValue]);

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Alert status="warning" borderRadius={10} mb={2}>
        <AlertIcon />
        Hãy đảm bảo rằng bạn đã đăng nhập tài khoản Instgram trên trình duyệt!
      </Alert>
      <Input
        label="Bước 1: Dán đường link bài viết vào đây. Hãy đảm bảo link bài viết là
        hợp lệ"
        placeholder="Link bài viết"
        onChange={handleChange}
        name="postURL"
        value={values.postURL}
      />
      <Box display="flex" gap={2}>
        <Input
          label="Bước 2: Mở đường link dưới đây"
          name="apiURL"
          value={values.apiURL}
          onChange={() => {}}
          isDisabled
        />
        <Button
          colorScheme="teal"
          onClick={() => window.open(values.apiURL, '_blank')}
          isDisabled={!values.apiURL}
          alignSelf="flex-end"
        >
          Mở
        </Button>
      </Box>
      <Textarea
        label="Bước 3: Dán toàn bộ nội dung của link vừa mở vào đây. Hãy đảm bảo dán
        đầy đủ tất cả nội dung từ link đó!"
        name="jsonData"
        placeholder="Dán nội dung vào đây"
        resize="none"
        height={150}
        onChange={handleChange}
        errorText={touched.jsonData && errors.jsonData}
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
        {mediaList.map((item, index) => (
          <MediaCard mediaItem={item} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default InstgramDownload;
