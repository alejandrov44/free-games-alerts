export enum GamePlatforms {
  Steam = "Steam",
  Epic = "Epic Games",
  Gog = "Gog",
}

export enum HeaderTypes {
  contentType = "content-type",
  cookie = "cookie",
}

export enum HeaderValues {
  contentType = "application/json; charset=UTF-8",
  steamCookie = "lastagecheckage=1-January-1999; birthtime=915170401; wants_mature_content=1",
}

export enum Methods {
  Get = "GET",
  Post = "POST",
}

export const monthMap: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};
