export enum GamePlatforms {
  Epic = "Epic Games",
  Gog = "Gog",
  Steam = "Steam",
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
  Apr: 3,
  Aug: 7,
  Dec: 11,
  Feb: 1,
  Jan: 0,
  Jul: 6,
  Jun: 5,
  Mar: 2,
  May: 4,
  Nov: 10,
  Oct: 9,
  Sep: 8,
};
