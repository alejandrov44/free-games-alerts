import { promises as fs } from "node:fs";
import path from "node:path";
import { Game } from "../interfaces";
import { HistoricalGamesJson, JsonGame } from "./interfaces";

const __dirname = import.meta.dirname;
const JSON_FILE_PATH = path.join(__dirname, "games.json");

export const checkNewGames = async (
  actualFreeGames: Game[]
): Promise<Game[]> => {
  let storedGames: JsonGame[] = [];

  try {
    const fileData = await fs.readFile(JSON_FILE_PATH, "utf8");
    const json = JSON.parse(fileData) as HistoricalGamesJson;
    storedGames = json.games;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }

  // Filter out games that are already stored
  const gamesToAdd = actualFreeGames.reduce((gamesToAdd, c) => {
    const gameId = `${c.title} - ${c.endDateDiscount?.getTime()}`;
    if (storedGames.some((storedGame) => storedGame.gameId === gameId))
      return gamesToAdd;
    const game: JsonGame = {
      ...c,
      gameId,
      endDateDiscount: c.endDateDiscount?.toJSON(),
    };
    gamesToAdd.push(game as never);
    return gamesToAdd;
  }, []) as JsonGame[];

  if (gamesToAdd.length === 0) return [];

  storedGames.push(...gamesToAdd);
  await fs.writeFile(
    JSON_FILE_PATH,
    JSON.stringify({ games: storedGames }, undefined, 2),
    "utf8"
  );

  return actualFreeGames.filter((game) =>
    gamesToAdd.some((gameToAdd) => game.title !== gameToAdd.title)
  );
};
