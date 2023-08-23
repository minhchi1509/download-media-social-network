import * as Yup from 'yup';

export const instagramFormValidation = Yup.object().shape({
  jsonData: Yup.string()
    .trim()
    .required(
      'Vui lòng copy và paste toàn bộ nội dung của URL đã mở ở trình duyệt!'
    )
});

export const facebookFormValidation = Yup.object({
  postURL: Yup.string().trim().required('Vui lòng nhập URL bài viết!'),
  postMode: Yup.string().required('Vui lòng chọn chế độ của bài viết!')
});
