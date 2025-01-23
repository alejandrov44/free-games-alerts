import { CheerioAPI, load } from "cheerio";
import { EpicResponse, GogResponse } from "./interfaces";

export enum HeaderTypes {
  contentType = "content-type",
  cookie = "cookie",
}

interface Header {
  name: HeaderTypes,
  value: string,
}

const getHeaders = (headers?: Header[]): HeadersInit => {
  return headers?.reduce((acc, header) => {
    acc[header.name] = header.value;
    return acc;
  }, {}) ?? {};
};

export const getApiRequest = async (url: string, headers?: Header[]): Promise<EpicResponse | GogResponse> => {
  const fetchConfig = {
    method: "GET",
    headers: getHeaders(headers),
  };
  const response = await fetch(url, fetchConfig);
  return await response.json() as EpicResponse;
};

export const getHTMLRequest = async (url: string, headers?: Header[]): Promise<CheerioAPI> => {
  const fetchConfig = {
    method: "GET",
    headers: getHeaders(headers),
  };
  const response = await fetch(url, fetchConfig);
  const html = load(await response.text());
  return html;
};

export const postRequest = async (url: string, body: BodyInit, headers?: Header[]): Promise<void> => {
  const fetchConfig: RequestInit = {
    method: "POST",
    headers: getHeaders(headers),
    body,
  };
  const response = await fetch(url, fetchConfig);
  // eslint-disable-next-line no-console
  if (!response.ok) console.log(response);
};
