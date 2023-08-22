export interface IForm {
  postURL: string;
  postMode?: 'public' | 'private';
  apiURL: string;
  jsonData: string;
}

export interface ISelectOption {
  label: string;
  value: string;
}
