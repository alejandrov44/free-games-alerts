import { CheerioAPI, load } from "cheerio";

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

export const getApiRequest = async (url: string, headers?: Header[]): Promise<any> => {
  const fetchConfig = {
    method: 'GET',
    headers: getHeaders(headers),
  };
  const response = await fetch(url, fetchConfig);
  return await response.json();
};

export const getHTMLRequest = async (url: string, headers?: Header[]): Promise<CheerioAPI> => {
  const fetchConfig = {
    method: 'GET',
    headers: getHeaders(headers),
  };
  const response = await fetch(url, fetchConfig);
  const html = load(await response.text());
  return html;
};

export const postRequest = async (url: string, body: BodyInit, headers?: Header[]): Promise<void> => {
  const fetchConfig: RequestInit = {
    method: 'POST',
    headers: getHeaders(headers),
    body,
  };
  const response = await fetch(url, fetchConfig);
  console.log(response);
};
