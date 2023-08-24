/* eslint-disable @typescript-eslint/no-floating-promises */
import { Alert, AlertIcon, Box, Button } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { TickIcon } from 'src/assets/icons/index';
import Input from 'src/components/Input';
import MediaCard from 'src/components/MediaCard';
import RadioSelect from 'src/components/RadioSelect';
import Textarea from 'src/components/Textarea';
import { useShowToast } from 'src/hooks/useShowToast';
import { IForm } from 'src/interfaces/form-interfaces';
import { IMedia } from 'src/interfaces/media-interfaces';
import { getDownloadFacebookMediaURL } from 'src/services/media-download-services';
import { formatFacebookMediaData } from 'src/utils/media-utils';
import { facebookFormValidation } from 'src/utils/validation-utils';
import { postModeList } from 'src/variables/constants';

const FacebookDownload = () => {
  const { showToast } = useShowToast();
  const [isCopiedAPIUrl, setIsCopiedAPIUrl] = React.useState<boolean>(false);
  const [isGettingData, setIsGettingData] = React.useState<boolean>(false);
  const [mediaList, setMediaList] = React.useState<IMedia[]>([]);

  const handleSubmitForm = async (values: IForm) => {
    values.jsonData = values.jsonData.trim();
    if (values.postMode === 'private' && !values.jsonData) {
      setFieldError(
        'jsonData',
        'Vui lòng copy và paste toàn bộ nội dung của URL đã mở ở trình duyệt!'
      );
      return;
    }
    try {
      setIsGettingData(true);
      const body = new FormData();
      body.append('q', values.postURL);
      body.append('html', values.jsonData);
      const response = await getDownloadFacebookMediaURL(body);
      if (response.mess) {
        throw errors;
      }
      setMediaList([formatFacebookMediaData(response.data)]);
      showToast('success', 'Lấy dữ liệu thành công!');
    } catch (error) {
      showToast('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu!');
    } finally {
      setIsGettingData(false);
    }
  };

  const handleCopy = async (_text: string, isCopied: boolean) => {
    setIsCopiedAPIUrl(isCopied);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('Done!');
      }, 1500);
    });
    setIsCopiedAPIUrl((prev) => !prev);
  };

  const {
    values,
    handleChange,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
    setFieldError
  } = useFormik<IForm>({
    initialValues: {
      postURL: '',
      postMode: undefined,
      apiURL: '',
      jsonData: ''
    },
    validationSchema: facebookFormValidation,
    onSubmit: handleSubmitForm
  });

  React.useEffect(() => {
    if (values.postMode === 'private' && values.postURL) {
      setFieldValue('apiURL', `view-source:${values.postURL.trim()}`);
    }
  }, [values.postURL, setFieldValue, values.postMode]);

  React.useEffect(() => {
    setFieldValue('jsonData', '');
  }, [values.postMode, setFieldValue]);

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Alert status="warning" borderRadius={10} mb={2}>
        <AlertIcon />
        Tính năng này áp dụng cho video/reels. Hãy đảm bảo rằng bạn đã đăng nhập
        Facebook trên trình duyệt!
      </Alert>
      <Input
        label="Bước 1: Dán đường link bài viết vào đây. Hãy đảm bảo link bài viết là
        hợp lệ"
        placeholder="Link bài viết"
        onChange={handleChange}
        name="postURL"
        value={values.postURL}
        errorText={touched.postURL && errors.postURL}
      />
      <RadioSelect
        label="Chọn chế độ của video hiện tại:"
        options={postModeList}
        name="postMode"
        value={values.postMode}
        onChange={handleChange('postMode')}
        errorText={touched.postMode && errors.postMode}
      />
      {values.postMode === 'private' && (
        <>
          <Box display="flex" gap={2}>
            <Input
              label="Bước 2: Sao chép đường link dưới đây và mở nó trong tab mới"
              name="apiURL"
              value={values.apiURL}
              onChange={() => {}}
              isDisabled
            />
            <CopyToClipboard text={values.apiURL} onCopy={handleCopy}>
              <Button
                colorScheme="teal"
                isDisabled={!values.apiURL}
                alignSelf="flex-end"
                {...(isCopiedAPIUrl ? { leftIcon: <TickIcon /> } : {})}
              >
                {isCopiedAPIUrl ? 'Đã sao chép' : 'Sao chép'}
              </Button>
            </CopyToClipboard>
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
        </>
      )}
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

export default FacebookDownload;
