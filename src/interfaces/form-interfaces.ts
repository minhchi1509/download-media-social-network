export interface IForm {
  postURL: string;
  postMode?: 'public' | 'private';
  mediaBelongsTo?: 'story' | 'post';
  apiURL: string;
  jsonData: string;
}

export interface ISelectOption {
  label: string;
  value: string;
}
