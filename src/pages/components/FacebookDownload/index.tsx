import { Alert, AlertIcon, Box, Button } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';

import Input from 'src/components/Input';
import RadioSelect from 'src/components/RadioSelect';
import { IForm } from 'src/interfaces/form-interfaces';
import { facebookFormValidation } from 'src/utils/validation-utils';
import { postModeList } from 'src/variables/constants';

const FacebookDownload = () => {
  const handleSubmitForm = (values: IForm) => {
    console.log(values);
  };

  const { values, handleChange, handleSubmit, touched, errors, setFieldValue } =
    useFormik<IForm>({
      initialValues: {
        postURL: '',
        postMode: undefined,
        apiURL: '',
        jsonData: ''
      },
      validationSchema: facebookFormValidation,
      onSubmit: handleSubmitForm
    });

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Alert status="warning" borderRadius={10} mb={2}>
        <AlertIcon />
        Tính năng này chỉ áp dụng cho video. Hãy đảm bảo rằng bạn đã đăng nhập
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
        <Input
          label="Bước 2: Mở đường link dưới đây"
          name="apiURL"
          value={values.apiURL}
          onChange={() => {}}
          isDisabled
        />
      )}
      <Button colorScheme="purple" onClick={() => handleSubmit()}>
        Lấy dữ liệu
      </Button>
    </Box>
  );
};

export default FacebookDownload;
