import * as Yup from 'yup';

export const mediaFormValidation = Yup.object().shape({
  jsonData: Yup.string().required(
    'Vui lòng copy và paste toàn bộ nội dung của URL đã mở ở trình duyệt!'
  )
});
