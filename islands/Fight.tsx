import { useState, useEffect } from "preact/hooks";
import { fighters } from "../routes/api/data/fighters/fighters.js";
import IFighter from "../interfaces/IFighter.tsx";
import Fighter from "./Fighter.tsx";
import Modal from "./Modal.tsx";
import { MoveType, Move } from "../interfaces/moves.ts";

export default function Fighters() {
  const [selectedFighters, setSelectedFighters] = useState<IFighter[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [loser, setLoser] = useState<string | null>(null);
  const [isFightButtonClicked, setIsFightButtonClicked] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [fightMoves, setFightMoves] = useState<Move[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [endingMove, setEndingMove] = useState<string | null>(null);

  const selectFighter = (fighter: IFighter) => {
    if (
      selectedFighters.some((selected) => selected.id === fighter.id) ||
      selectedFighters.some(
        (selected) => selected.division !== fighter.division
      )
    ) {
      return;
    }
    if (selectedFighters.length < 2) {
      setSelectedFighters([...selectedFighters, fighter]);
    }
  };

  const getRandomMove = () => {
    const moves = Object.values(MoveType);  
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    console.log(randomMove);
    
    return randomMove;
  };

  const fight = () => {
    setIsFightButtonClicked(true);
    const fighter1 = selectedFighters[0];
    const fighter2 = selectedFighters[1];

    let currentFighter = fighter1;
    let opponent = fighter2;

    const movesSequence: Move[] = [];
    for (let i = 0; i < 50; i++) {
      const moveType = getRandomMove();
      movesSequence.push({
        type: moveType,
        photo: `${currentFighter.id}-${moveType}.png`,
      });

      // Swap fighters
      [currentFighter, opponent] = [opponent, currentFighter];

      // Check for fight ending moves
      if (moveType === MoveType.BLOCKED_STRIKING || moveType === MoveType.DEFENDED_GRAPPLING || moveType === MoveType.DEFENDED_TAKE_DOWN) {
        continue;
      }
      if (Math.random() < 0.1) { // Randomly end fight
        setEndingMove(moveType);
        break;
      }
    }
    setFightMoves(movesSequence);
    

    const score1 = Math.random() * (fighter1.strength + fighter1.skill);
    const score2 = Math.random() * (fighter2.strength + fighter2.skill);
    const winner = score1 > score2 ? fighter1.name : fighter2.name;
    const loser = score1 < score2 ? fighter1.name : fighter2.name;
    setWinner(winner);
    setLoser(loser);
    setCurrentImage(`${fighter1.id}-faceoff.png`);
    setCurrentMoveIndex(0);
  };

  const closeModal = () => {
    setSelectedFighters([]);
    setWinner(null);
    setLoser(null);
    setIsFightButtonClicked(false);
    setFightMoves([]);
    setCurrentImage(null);
    setCurrentMoveIndex(0);
    setShowResult(false);
    setEndingMove(null);
  };

  useEffect(() => {
    if (isFightButtonClicked && currentMoveIndex < fightMoves.length) {
      const timeout = setTimeout(() => {
        setCurrentImage(fightMoves[currentMoveIndex].photo);
        setCurrentMoveIndex(currentMoveIndex + 1);
      }, 1000);
      return () => clearTimeout(timeout);
    } else if (currentMoveIndex >= fightMoves.length && winner && loser) {
      setTimeout(() => {
        setShowResult(true);
      }, 1000);
      setCurrentImage(`${winner}-victory.png`);
    }
  }, [isFightButtonClicked, currentMoveIndex, fightMoves, winner, loser]);

  const divisions = [...new Set(fighters.map(fighter => fighter.division))];

  return (
    <section>
      {divisions.map((division) => (
        <div key={division}>
          <hr class="border-dashed border-3 border-purple-600 my-6 mx-auto opacity-80 rounded" />
          <h2 class="text-3xl font-bold my-4 mx-4 underline">{division}</h2>
          <article class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 m-2 overflow-hidden">
            {fighters
              .filter(fighter => fighter.division === division)
              .map((fighter) => (
                <div
                  key={fighter.id}
                  onClick={() => selectFighter(fighter)}
                  class={`cursor-pointer hover:border-dotted hover:border-2 hover:border-purple-400 m-0.5 hover:m-0 ${
                    selectedFighters.some((selected) => selected.id === fighter.id)
                      ? "border-solid border-2 border-purple-700"
                      : ""
                  }`}
                >
                  <Fighter {...fighter} />
                </div>
              ))}
          </article>
        </div>
      ))}

      {selectedFighters.length === 2 && (
        <Modal onClose={closeModal}>
          <div class="p-2 rounded-lg flex flex-col md:flex-row justify-between gap-4">
            {selectedFighters.map((fighter) => (
              <Fighter {...fighter} />
            ))}
          </div>
          <div class="flex justify-center">
            <button
              onClick={fight}
              disabled={isFightButtonClicked}
              class={`bg-black text-white py-3 px-5 rounded-lg text-2xl m-2 font-semibold  ${
                isFightButtonClicked ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Fight!
            </button>
          </div>

          {currentImage && (
            <div class="flex flex-col items-center mt-4 transition-opacity duration-500">
              <img src={`/images/${currentImage}`} alt="Fight move" class="w-full max-w-md"/>
            </div>
          )}

          {showResult && winner && (
            <div class="text-black font-bold flex justify-center text-3xl mt-2 text-center drop-shadow-md">
              {(`🏆 ${winner} won! Fight ended with ${endingMove ? endingMove : "decision"} over 💩 ${loser}!`).toUpperCase()}
            </div>
          )}
        </Modal>
      )}
    </section>
  );
}