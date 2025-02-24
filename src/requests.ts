import { CheerioAPI, load } from "cheerio";
import { EpicResponse, GogResponse } from "./crawler/interfaces";
import { Header } from "./interfaces";
import { Methods } from "./enums";

const getHeaders = (headers: Header[]): Headers => {
  const headerObject = new Headers();
  for (const { name, value } of headers) headerObject.append(name, value);
  return headerObject;
};

export const getApiRequest = async (url: string, headers?: Header[]): Promise<EpicResponse | GogResponse> => {
  const fetchConfig = { method: Methods.Get, headers: headers ? getHeaders(headers) : undefined };
  const response = await fetch(url, fetchConfig);
  return (await response.json()) as EpicResponse;
};

export const getHTMLRequest = async (url: string, headers?: Header[]): Promise<CheerioAPI> => {
  const fetchConfig = { method: Methods.Get, headers: headers ? getHeaders(headers) : undefined };
  const response = await fetch(url, fetchConfig);
  const html = load(await response.text());
  return html;
};

export const postRequest = async (url: string, body: any, headers?: Header[]): Promise<void> => {
  const fetchConfig: RequestInit = { method: Methods.Post, headers: headers ? getHeaders(headers) : undefined, body };
  const response = await fetch(url, fetchConfig);
  if (!response.ok) console.log(response);
};
