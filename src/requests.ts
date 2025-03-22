import { CheerioAPI, load } from "cheerio";
import { EpicResponse, GogResponse } from "./crawler/interfaces";
import { Header } from "./interfaces";
import { Methods } from "./enums";
import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";

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

export const postRequest = async (url: string, body: any, headers?: AxiosHeaders): Promise<void> => {
  const config: AxiosRequestConfig = { method: Methods.Post, maxBodyLength: Infinity, url, headers, data: body };
  console.log(config);
  try {
    const response = await axios.request(config);
    console.dir(`Webhook Sended: ${response.statusText}`);
  } catch (error: any) {
    if (!(error instanceof AxiosError)) throw new Error(error);
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};
