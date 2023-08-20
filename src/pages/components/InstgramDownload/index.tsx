/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Text,
  useToast
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';

import Input from 'src/components/Input';
import Textarea from 'src/components/Textarea';
import { useShowToast } from 'src/hooks/useShowToast';
import { IForm } from 'src/interfaces/form-interfaces';
import { IMediaDetail } from 'src/interfaces/media-interfaces';
import {
  getInstagramAPIURL,
  getUnBlockedMediaUrl
} from 'src/utils/common-utils';
import { mediaFormValidation } from 'src/utils/validation-utils';
import { instagramURLRegex } from 'src/variables/constants';

const InstgramDownload = () => {
  const { showToast } = useShowToast();
  const [mediaList, setMediaList] = React.useState<IMediaDetail[]>([]);

  const handleSubmitForm = ({ jsonData }: IForm) => {
    try {
      const data = JSON.parse(jsonData).items[0];
      if (
        !data.carousel_media &&
        !data.image_versions2.candidates[0].url &&
        !data.video_versions[0].url
      ) {
        showToast('error', 'Lấy dữ liệu thất bại. Vui lòng kiểm tra lại!');
        return;
      }
      if (data.carousel_media !== undefined) {
        const medias: IMediaDetail[] = data.carousel_media.reduce(
          (result: IMediaDetail[], currentMedia: any) => {
            const isImageType = currentMedia.media_type === 1;
            result.push({
              type: isImageType ? 'image' : 'video',
              url: getUnBlockedMediaUrl(
                isImageType
                  ? currentMedia.image_versions2.candidates[0].url
                  : currentMedia.video_versions[0].url
              )
            });
            return result;
          },
          []
        );
        setMediaList(medias);
      } else {
        const isImageType = data.media_type === 1;
        setMediaList([
          {
            type: isImageType ? 'image' : 'video',
            url: getUnBlockedMediaUrl(
              isImageType
                ? data.image_versions2.candidates[0].url
                : data.video_versions[0].url
            )
          }
        ]);
      }
      showToast('success', 'Lấy dữ liệu thành công!');
    } catch (error) {
      showToast('error', 'Lấy dữ liệu thất bại. Vui lòng kiểm tra lại!');
    }
  };

  const { values, handleChange, handleSubmit, touched, errors, setFieldValue } =
    useFormik<IForm>({
      initialValues: {
        postURL: '',
        apiURL: '',
        jsonData: ''
      },
      validationSchema: mediaFormValidation,
      onSubmit: handleSubmitForm
    });

  React.useEffect(() => {
    if (instagramURLRegex.test(values.postURL)) {
      setFieldValue('apiURL', getInstagramAPIURL(values.postURL));
    } else {
      setFieldValue('apiURL', '');
    }
  }, [values.postURL, touched.postURL, setFieldValue]);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Alert status="warning" borderRadius={10}>
        <AlertIcon />
        Hãy đảm bảo rằng bạn đã đăng nhập tài khoản Instgram trên trình duyệt!
      </Alert>
      <Text fontSize="medium" fontWeight="medium">
        Bước 1: Dán đường link bài viết vào đây. Hãy đảm bảo link bài viết là
        hợp lệ
      </Text>
      <Input
        placeholder="Link bài viết"
        onChange={handleChange}
        name="postURL"
        value={values.postURL}
      />
      <Text fontSize="medium" fontWeight="medium">
        Bước 2: Mở đường link dưới đây
      </Text>
      <Box display="flex" gap={2}>
        <Input
          name="apiURL"
          value={values.apiURL}
          onChange={() => {}}
          isDisabled
        />
        <Button
          colorScheme="teal"
          onClick={() => window.open(values.apiURL, '_blank')}
          isDisabled={!values.apiURL}
        >
          Mở
        </Button>
      </Box>
      <Text fontSize="medium" fontWeight="medium">
        Bước 3: Dán toàn bộ nội dung của link vừa mở vào đây. Hãy đảm bảo dán
        đầy đủ tất cả nội dung từ link đó!
      </Text>
      <Textarea
        name="jsonData"
        placeholder="Dán nội dung vào đây"
        resize="none"
        height={150}
        onChange={handleChange('jsonData')}
        errorText={touched.jsonData && errors.jsonData}
      />
      <Button colorScheme="purple" onClick={() => handleSubmit()}>
        Lấy dữ liệu
      </Button>
      {/* <video
        src="https://ig.minhchiptit.workers.dev/https://scontent.cdninstagram.com/v/t66.30100-16/119609024_828169318971893_7250765436795760877_n.mp4?efg=eyJxZV9ncm91cHMiOiJbXCJpZ19wcm9ncmVzc2l2ZV91cmxnZW4ucHJvZHVjdF90eXBlLmNsaXBzXCJdIn0&_nc_ht=z-p4-instagram.fhan5-2.fna.fbcdn.net&_nc_cat=105&_nc_ohc=W_inkuOVaMEAX_RXdVE&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AfAtiJXpHb2IVrVEeTP5J8AWlrb8LG2ngFlr5qbR1H9X9w&oe=64E3687A&_nc_sid=4f4799"
        height={360}
        width={360}
        style={{ borderRadius: '16px' }}
        controls
        controlsList="nodownload"
      ></video> */}
    </Box>
  );
};

export default InstgramDownload;
