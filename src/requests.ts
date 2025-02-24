import { CheerioAPI, load } from "cheerio"
import { EpicResponse, GogResponse } from "./crawler/interfaces"
import { Header } from "./interfaces"

const getHeaders = (headers: Header[]): Headers => {
  const headerObj = new Headers();
  headers.forEach(({ name, value }) => headerObj.append(name, value));
  return headerObj;
};

export const getApiRequest = async (
  url: string,
  headers?: Header[]
): Promise<EpicResponse | GogResponse> => {
  const fetchConfig = {
    method: "GET",
    headers: headers ? getHeaders(headers) : undefined,
  }
  const response = await fetch(url, fetchConfig)
  return (await response.json()) as EpicResponse
}

export const getHTMLRequest = async (
  url: string,
  headers?: Header[]
): Promise<CheerioAPI> => {
  const fetchConfig = {
    method: "GET",
    headers: headers ? getHeaders(headers) : undefined,
  }
  const response = await fetch(url, fetchConfig)
  const html = load(await response.text())
  return html
}

export const postRequest = async (
  url: string,
  body: any,
  headers?: Header[]
): Promise<void> => {
  const fetchConfig: RequestInit = {
    method: "POST",
    headers: headers ? getHeaders(headers) : undefined,
    body,
  }
  const response = await fetch(url, fetchConfig)
  // eslint-disable-next-line no-console
  if (!response.ok) console.log(response)
}
