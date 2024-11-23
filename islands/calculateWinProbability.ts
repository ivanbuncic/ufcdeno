import { IFighter } from "../interfaces/IFighter.tsx";
/**
 * @param {IFighter} fighter - The fighter object containing age, streak, wins, losses, and draws.
 * @returns {number} - The calculated probability of winning.
 */
export function calculateWinProbability(fighter: IFighter): number {
  const ageFactor = (fighter.age >= 27 && fighter.age <= 33) ? 1.2 : 1.0;
  // Adjust streak factor to have a more moderate influence
  const streakFactor = 1 + Math.log1p(fighter.streak) / 10;
  // Record factor
  const recordFactor = fighter.wins /
    (fighter.wins + fighter.loses + fighter.draw);
  const baseProbability = 0.5; // Base probability for randomness
  const finalProbability = baseProbability * ageFactor * streakFactor *
    recordFactor;
  return Math.min(finalProbability, 1.0);
}
