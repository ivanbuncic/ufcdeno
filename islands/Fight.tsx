import { useState, useEffect, useRef } from "preact/hooks";
import { fighters } from "../routes/api/data/fighters/fighters.js";
import IFighter from "../interfaces/IFighter.tsx";
import Fighter from "./Fighter.tsx";
import Modal from "./Modal.tsx";
import { MoveType, Move } from "../interfaces/moves.ts";

/**
 * Fighters component renders a list of fighters and manages the fight simulation
 */
export default function Fighters() {
  const [selectedFighters, setSelectedFighters] = useState<IFighter[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [loser, setLoser] = useState<string | null>(null);
  const [isFightButtonClicked, setIsFightButtonClicked] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [fightMoves, setFightMoves] = useState<Move[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [endingMove, setEndingMove] = useState<string | null>(null);
  const [isFading, setIsFading] = useState<boolean>(false);
  const fightAudioRef = useRef<HTMLAudioElement | null>(null);

  /**
   * Selects a fighter if not already selected or from different division
   * @param {IFighter} fighter
   */
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

  /**
   * Returns a random move from MoveType
   * @returns {MoveType} Random move type
   */
  const getRandomMove = () => {
    const moves = Object.values(MoveType);
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    return randomMove;
  };

  /**
   * Simulates the fight between the selected fighters
   */
  const fight = () => {
    setIsFightButtonClicked(true);
    if (fightAudioRef.current) {
      fightAudioRef.current.play();
    }
    const fighter1 = selectedFighters[0];
    const fighter2 = selectedFighters[1];

    let currentFighter = fighter1;
    let opponent = fighter2;

    const movesSequence: Move[] = [];
    for (let i = 0; i < 50; i++) {
      const moveType = getRandomMove();
      movesSequence.push({
        type: moveType,
        photo: `${currentFighter.id}-${moveType}.jpg`,
      });

      // Swap fighters
      [currentFighter, opponent] = [opponent, currentFighter];

      // Check for fight ending moves
      if (
        moveType === MoveType.BLOCKED_STRIKING ||
        moveType === MoveType.DEFENDED_GRAPPLING ||
        moveType === MoveType.DEFENDED_TAKE_DOWN
      ) {
        continue;
      }
      if (Math.random() < 0.1) {
        // Randomly end fight
        setEndingMove(moveType);
        break;
      }
    }
    setFightMoves(movesSequence);

    const score1 = Math.random() * (fighter1.strength + fighter1.skill);
    const score2 = Math.random() * (fighter2.strength + fighter2.skill);
    const winner = score1 > score2 ? fighter1.name : fighter2.name;
    const loser = score1 < score2 ? fighter1.name : fighter2.name;
    const winnerId = score1 > score2 ? fighter1.id : fighter2.id;
    setWinner(winner);
    setLoser(loser);
    setWinnerId(winnerId);
    setCurrentImage(`${fighter1.id}-faceoff.jpg`);
    setCurrentMoveIndex(0);
  };

  /**
   * Closes the fight modal and resets the states
   */
  const closeModal = () => {
    setSelectedFighters([]);
    setWinner(null);
    setWinnerId(null);
    setLoser(null);
    setIsFightButtonClicked(false);
    setFightMoves([]);
    setCurrentImage(null);
    setCurrentMoveIndex(0);
    setShowResult(false);
    setEndingMove(null);
    if (fightAudioRef.current) {
      fightAudioRef.current.pause();
      fightAudioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (isFightButtonClicked && currentMoveIndex < fightMoves.length) {
      const timeout = setTimeout(() => {
        setIsFading(true);
        setTimeout(() => {
          setCurrentImage(fightMoves[currentMoveIndex].photo);
          setCurrentMoveIndex(currentMoveIndex + 1);
          setIsFading(false);
        }, 400); // Duration of the fade-out
      }, 1600);
      return () => clearTimeout(timeout);
    } else if (currentMoveIndex >= fightMoves.length && winner && loser) {
      setTimeout(() => {
        setShowResult(true);
      }, 160);
      setCurrentImage(`${winnerId}-victory.jpg`);
    }
  }, [isFightButtonClicked, currentMoveIndex, fightMoves, winner, loser]);

  const divisions = [...new Set(fighters.map((fighter) => fighter.division))];

  return (
    <section>
      <audio ref={fightAudioRef} src="/music/fight-music.mp3" />
      {divisions.map((division) => (
        <div class="relative" key={division}>
          <hr class="border-dashed border-3 border-purple-600 my-6 mx-auto opacity-80 rounded" />
          <h2 class="text-3xl font-bold my-4 mx-4 underline">{division}</h2>
          <article class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 m-2 overflow-hidden">
            {fighters
              .filter((fighter) => fighter.division === division)
              .map((fighter) => (
                <div
                  key={fighter.id}
                  onClick={() => selectFighter(fighter)}
                  class={`cursor-pointer hover:border-dotted hover:border-2 hover:border-purple-400 m-0.5 hover:m-0 focus:border-dotted focus:border-2 focus:border-purple-400 focus:m-0 custom-focus-visible ${
                    selectedFighters.some(
                      (selected) => selected.id === fighter.id
                    )
                      ? "border-solid border-2 border-purple-700"
                      : ""
                  }`}
                  tabindex={0}
                  role="button"
                  aria-pressed={selectedFighters.some(
                    (selected) => selected.id === fighter.id
                  )}
                  aria-label={`Select ${fighter.name}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      selectFighter(fighter);
                    }
                  }}
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
              class={`bg-black text-white py-2 px-4 rounded-lg text-xl m-2 font-semibold max-h-16 btn-custom-focus-visible hover:bg-purple-800 ${
                isFightButtonClicked ? "opacity-30 cursor-not-allowed" : ""
              }`}
              aria-label="Start Fight"
              tabindex={0}
            >
              Fight!
            </button>
          </div>

          {currentImage && (
            <div
              class={`flex flex-col z-30 items-center w-full m-auto mt-16 absolute top-0 image-transition ${
                isFading ? "opacity-60" : "opacity-100"
              }`}
            >
              <img
                src={
                  currentImage
                    ? `/photos/moves/ready/${currentImage}`
                    : `/photos/moves/move_frame_placeholder.jpg`
                }
                alt={`${currentImage}`}
                class="w-full max-w-lg rounded-md shadow-lg"
              />
            </div>
          )}
          {showResult && winner && (
            <div class="text-black font-bold flex text-2xl -mt-24 justify-center text-center lg:mt-8 bg-white items-center z-50 max-w-2xl mx-auto">
              <p>
                🏆 {winner} won! Fight ended with{" "}
                {endingMove ? endingMove : "decision"} over {loser}!
              </p>
            </div>
          )}
        </Modal>
      )}
    </section>
  );
}
