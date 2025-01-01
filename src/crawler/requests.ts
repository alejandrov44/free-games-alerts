export enum HeaderTypes {
  contentType = "content-type",
}

interface Header {
  name: HeaderTypes,
  value: string,
}

const getHeaders = (headers?: Header[]): Record<string, any> => {
  return headers?.reduce((acc, header) => {
    acc[header.name] = header.value;
    return acc;
  }, {}) || {};
};


export const getRequest = async (url: string, headers?: Header[]): Promise<any> => {
  const fetchConfig = {
    method: 'GET',
    headers: getHeaders(headers),
  };
  const response = await fetch(url, fetchConfig);
  return await response.json();
};
