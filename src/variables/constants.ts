import { ISelectOption } from 'src/interfaces/form-interfaces';

export const postModeList: ISelectOption[] = [
  { label: 'Công khai', value: 'public' },
  {
    label: 'Bạn bè, riêng tư,...',
    value: 'private'
  }
];

export const mediaBelongsToList: ISelectOption[] = [
  { label: 'Bài viết', value: 'post' },
  { label: 'Story', value: 'story' }
];
