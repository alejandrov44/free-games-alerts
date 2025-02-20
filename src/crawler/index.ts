import { Game } from "../interfaces";
import { fetchFreeEpicGames } from "./epic-store";
// import { fetchFreeGogGames } from "./gog";
import { fetchSteamGames } from "./steam";

const freeGamesList: Promise<Game[]> = (async () => {
  const freeEpicGamesList = await fetchFreeEpicGames();
  const freeSteamGamesList = await fetchSteamGames();
  // const freeGogGamesList = await fetchFreeGogGames();

  return [
    ...freeEpicGamesList,
    ...freeSteamGamesList,
    // ...freeGogGamesList,
  ];
})();

export default freeGamesList;
