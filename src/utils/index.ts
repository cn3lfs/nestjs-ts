export interface Dictionary<T> {
  [Key: string]: T;
}

export interface IResponse {
  code: string;
  message: string;
  data: any;
  meta: Dictionary<any>;
}

export const getResponse = (result): IResponse => {
  return {
    code: '200',
    message: '成功',
    data: result,
    meta: {},
  };
};
