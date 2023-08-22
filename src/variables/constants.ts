import { ISelectOption } from 'src/interfaces/form-interfaces';

export const instagramURLRegex =
  /^(https:\/\/www\.instagram\.com\/(p|reel)\/[A-Za-z0-9_-]+)/;

export const postModeList: ISelectOption[] = [
  { label: 'Công khai', value: 'public' },
  {
    label: 'Bạn bè, riêng tư,...',
    value: 'private'
  }
];
