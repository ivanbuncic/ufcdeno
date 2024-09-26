import { useState, useEffect, useRef } from "preact/hooks";
import { fighters } from "../routes/api/data/fightersData.ts";
import { IFighter } from "../interfaces/IFighter.tsx";
import Fighter from "./Fighter.tsx";
import Modal from "./Modal.tsx";
import { MoveType, Move } from "../interfaces/moves.ts";
import { determineWinner } from "./determineWinner.ts";

/**
 * Fighters component renders a list of fighters and manages the fight simulation
 */
export default function FightersFight() {
  const [selectedFighters, setSelectedFighters] = useState<IFighter[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [loser, setLoser] = useState<string | null>(null);
  const [isFightButtonClicked, setIsFightButtonClicked] = useState(false);
  // const [currentImage, setCurrentImage] = useState<string | null>(null);
  //const [isImageError, setIsImageError] = useState(false);
  const [fightMoves, setFightMoves] = useState<Move[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [endingMove, setEndingMove] = useState<string | null>(null);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const fightAudioRef = useRef<HTMLAudioElement | null>(null);

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
    return randomMove;
  };

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
    for (let i = 0; i < 47; i++) {
      const moveType = getRandomMove();
      movesSequence.push({
        type: moveType,
        photo: `${currentFighter.id}-${moveType}.jpg`,
      });

      // Swap fighters
      [currentFighter, opponent] = [opponent, currentFighter];

      if (
        moveType === MoveType.BLOCKED_STRIKING ||
        moveType === MoveType.DEFENDED_GRAPPLING ||
        moveType === MoveType.DEFENDED_TAKE_DOWN
      ) {
        continue;
      }
      if (i > 7 && Math.random() < 0.1) {
        setEndingMove(moveType);
        break;
      }
    }
    setFightMoves(movesSequence);

    const { winnerName, loserName, winnerId } = determineWinner(
      fighter1,
      fighter2
    );
    setWinner(winnerName);
    setLoser(loserName);
    setWinnerId(winnerId);
    //setCurrentImage(`${fighter1.id}-faceoff.jpg`);
    setCurrentMoveIndex(0);
  };

  const closeModal = () => {
    setSelectedFighters([]);
    setWinner(null);
    setWinnerId(null);
    setLoser(null);
    setIsFightButtonClicked(false);
    setFightMoves([]);
    //setCurrentImage(null);
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
          //setCurrentImage(fightMoves[currentMoveIndex].photo);
          setCurrentMoveIndex(currentMoveIndex + 1);
          setIsFading(false);
          //setIsImageError(false); // Reset error state
        }, 200);
      }, 1200);
      return () => clearTimeout(timeout);
    } else if (currentMoveIndex >= fightMoves.length && winner && loser) {
      setTimeout(() => {
        setShowResult(true);
      }, 160);
      //setCurrentImage(`${winnerId}-victory.jpg`);
      //setIsImageError(false); // Reset error state
    }
  }, [isFightButtonClicked, currentMoveIndex, fightMoves, winner, loser]);

  const divisions = [...new Set(fighters.map((fighter) => fighter.division))];

  const handleSearch = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setSearchTerm(target.value);
  };

  return (
    <section>
      <audio ref={fightAudioRef} src="/music/fight-music.mp3" />
      <div class="mx-auto mt-4 flex flex-row justify-center max-w-xl lg:w-xl ">
        <input
          type="text"
          placeholder="Search fighters..."
          onInput={handleSearch}
          class="border-dashed border rounded border-purple-600 py-3 px-5 font-semibold italic text-base w-full"
        />
      </div>
      {divisions.map((division) => {
        const filteredFighters = fighters
          .filter((fighter) => fighter.division === division)
          .filter((fighter) =>
            fighter.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

        if (filteredFighters.length === 0) return null;

        return (
          <div class="relative" key={division}>
            <hr class="border-dashed border-3 border-purple-600 my-6 mx-auto opacity-80 rounded" />
            <h2 class="text-3xl font-bold my-4 mx-4 underline">{division}</h2>
            <article class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 m-2 overflow-hidden">
              {filteredFighters.map((fighter) => (
                <div
                  key={fighter.id}
                  onClick={() => selectFighter(fighter)}
                  class={`cursor-pointer custom-focus-visible ${
                    selectedFighters.some(
                      (selected) => selected.id === fighter.id
                    )
                      ? "border-dotted border-2 border-purple-700"
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
        );
      })}

      {selectedFighters.length === 2 && (
        <Modal onClose={closeModal}>
          <div class="p-2 rounded-lg justify-between grid grid-cols-1 gap-4 sm:grid-cols-2 row-span-2 relative">
            {selectedFighters.map((fighter) => (
              <div><Fighter {...fighter} /></div>
            ))}
         

          {/* {currentImage && !isImageError ? (
            <div
              class={`z-30 grid items-center w-full mx-auto absolute top-0 image-transition left-2/4 ${
                isFading ? "opacity-95" : "opacity-100"
              }`}
            >
              <img
                src={`/photos/moves/ready/${currentImage}`}
                alt={`${currentImage}`}
                class="w-full max-w-lg rounded-md shadow-lg"
                onError={() => setIsImageError(true)}
              />
            </div>
          ) : (
            <div
              class={`z-30 grid items-center w-full m-auto absolute top-0 image-transition ${
                isFading ? "opacity-90" : "opacity-100"
              }`}
            >
              <p class="text-center text-3xl font-bold text-black">
               
                {fightMoves[currentMoveIndex]?.type.toUpperCase()}
              </p>
            </div>
          )} */}

          {showResult && winner && (
            <div class="text-black font-bold text-2xl text-center bg-white items-center z-50 max-w-2xl mx-auto flex justify-center">
              <p>
                🏆 {winner} won! Fight ended with{" "}
                {endingMove ? endingMove : "decision"} over {loser}!
              </p>
            </div>
          )}
           </div>
          
           <p class="text-center text-3xl font-bold text-black">
               {fightMoves[currentMoveIndex]?.type.toUpperCase()}
             </p>
           <div class="flex justify-center mt-4 mx-auto">
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
        </Modal>
      )}
    </section>
  );
}
