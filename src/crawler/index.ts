import { fetchFreeEpicGames } from "./epic-store";
// import { fetchFreeGogGames } from "./gog";
import { fetchSteamGames } from "./steam";

const freeGamesList = async () => {
  const freeEpicGamesList = await fetchFreeEpicGames();
  const freeSteamGamesList = await fetchSteamGames();
  // const freeGogGamesList = await fetchFreeGogGames();

  return [
    ...freeEpicGamesList,
    ...freeSteamGamesList,
    // ...freeGogGamesList,
  ];
};

export default freeGamesList;
