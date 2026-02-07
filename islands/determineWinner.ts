import { calculateWinProbability } from "./calculateWinProbability.ts";
import { IFighter } from "../interfaces/IFighter.tsx";

/**
 * Determines the winner between two fighters based on their win probability
 * @param {IFighter} fighter1
 * @param {IFighter} fighter2
 * @returns {Object} Object containing winnerName, loserName, and winnerId
 */

export function determineWinner(fighter1: IFighter, fighter2: IFighter) {
  const winProbability1 = calculateWinProbability(fighter1);
  const winProbability2 = calculateWinProbability(fighter2);

  const score1 = Math.random() * winProbability1;
  const score2 = Math.random() * winProbability2;
  const winnerName = score1 > score2
    ? fighter1["full name"]
    : fighter2["full name"];
  const loserName = score1 > score2
    ? fighter2["full name"]
    : fighter1["full name"];
  const winnerId = score1 > score2 ? fighter1.id : fighter2.id;

  return { winnerName, loserName, winnerId };
}
