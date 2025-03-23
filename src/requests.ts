/* eslint-disable no-console */
import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";
import { CheerioAPI, load } from "cheerio";
import { EpicResponse, GogResponse } from "./crawler/interfaces";
import { Methods } from "./enums";
import { Header } from "./interfaces";

const getHeaders = (headers: Header[]): Headers => {
  const headerObject = new Headers();
  for (const { name, value } of headers) {
    headerObject.append(name, value);
  }
  return headerObject;
};

export const getApiRequest = async (url: string, headers?: Header[]): Promise<EpicResponse | GogResponse> => {
  const fetchConfig = { headers: headers ? getHeaders(headers) : undefined, method: Methods.Get };
  const response = await fetch(url, fetchConfig);
  return (await response.json()) as EpicResponse;
};

export const getHTMLRequest = async (url: string, headers?: Header[]): Promise<CheerioAPI> => {
  const fetchConfig = { headers: headers ? getHeaders(headers) : undefined, method: Methods.Get };
  const response = await fetch(url, fetchConfig);
  const html = load(await response.text());
  return html;
};

export const postRequest = async (url: string, body: unknown, headers?: AxiosHeaders): Promise<void> => {
  const config: AxiosRequestConfig = { data: body, headers, maxBodyLength: Infinity, method: Methods.Post, url };
  try {
    const response = await axios.request(config);
    console.dir(`Webhook Sended: ${response.statusText}`);
  } catch (error: unknown) {
    if (!(error instanceof AxiosError)) {
      throw new Error(error as string);
    }
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
