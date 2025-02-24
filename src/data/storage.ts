import { promises as fs } from "node:fs";
import path from "node:path";
import { Game } from "../interfaces";
import { HistoricalGamesJson, JsonGame } from "./interfaces";

const __dirname = import.meta.dirname;
const JSON_FILE_PATH = path.join(__dirname, "games.json");

export const checkNewGames = async (actualFreeGames: Game[]): Promise<Game[]> => {
  let storedGames: JsonGame[] = [];

  try {
    const fileData = await fs.readFile(JSON_FILE_PATH, "utf8");
    const json = JSON.parse(fileData) as HistoricalGamesJson;
    storedGames = json.games;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }

  // Filter out games that are already stored
  const gamesToAdd: JsonGame[] = [];

  for (const actualFreeGame of actualFreeGames) {
    const gameId = `${actualFreeGame.title} - ${actualFreeGame.endDateDiscount?.getTime()}`;
    if (!storedGames.some((storedGame) => storedGame.gameId === gameId)) {
      const game: JsonGame = { ...actualFreeGame, gameId, endDateDiscount: actualFreeGame.endDateDiscount?.toJSON() };
      gamesToAdd.push(game);
    }
  }

  if (gamesToAdd.length === 0) return [];

  storedGames.push(...gamesToAdd);
  await fs.writeFile(JSON_FILE_PATH, JSON.stringify({ games: storedGames }, undefined, 2), "utf8");

  return actualFreeGames.filter((game) => gamesToAdd.some((gameToAdd) => game.title === gameToAdd.title));
};
