import { promises as fs } from "fs";
import * as path from "path";
import { Game } from "../interfaces";
import { HistoricalGamesJson, JsonGame } from "./interfaces";

const JSON_FILE_PATH = path.join(__dirname, "games.json");

export const checkNewGames = async (actualFreeGames: Game[]): Promise<Game[]> => {
  let storedGames: JsonGame[] = [];

  try {
    const fileData = await fs.readFile(JSON_FILE_PATH, "utf-8");
    const json = JSON.parse(fileData) as HistoricalGamesJson;
    storedGames = json.games;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  
  // Filter out games that are already stored
  const gamesToAdd = actualFreeGames.reduce((acc, c) => {
    const gameId = `${c.title}${c.endDateDiscount?.getTime()}`;
    if (storedGames.some(storedGame => storedGame.gameId === gameId)) return acc;
    const game: JsonGame = {
      ...c,
      gameId,
      endDateDiscount: c.endDateDiscount?.toJSON(),
    };
    acc.push(game as never);
    return acc;
  }, []) as JsonGame[];
  
  if (gamesToAdd.length > 0) {
    storedGames.push(...gamesToAdd);
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify({ games: storedGames }, null, 2), "utf-8");
    console.log("OK ADDED");
  }

  return actualFreeGames.filter(game => gamesToAdd.some(gameToAdd => game.title !== gameToAdd.title));
};