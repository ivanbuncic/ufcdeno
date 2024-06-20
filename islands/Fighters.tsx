import { useState } from 'preact/hooks';
import { fighters } from '../routes/api/data/fighters/fighters.js';
import IFighter from '../interfaces/IFighter.tsx';
import Fighter from './Fighter.tsx';
import Modal from './Modal.tsx';

export default function Fighters() {
    const [selectedFighters, setSelectedFighters] = useState<IFighter[]>([]);
    const [winner, setWinner] = useState<string | null>(null);
    const [loser, setLoser] = useState<string | null>(null);
    const [isFightButtonClicked, setIsFightButtonClicked] = useState(false);

    const selectFighter = (fighter: IFighter) => {
        if (
            selectedFighters.some(selected => selected.id === fighter.id) ||
            selectedFighters.some(
                selected => selected.division !== fighter.division
            )
        ) {
            return;
        }
        if (selectedFighters.length < 2) {
            setSelectedFighters([...selectedFighters, fighter]);
        }
    };

    const fight = () => {
        setIsFightButtonClicked(true);
        const fighter1 = selectedFighters[0];
        const fighter2 = selectedFighters[1];
        const score1 = Math.random() * (fighter1.strength + fighter1.skill);
        const score2 = Math.random() * (fighter2.strength + fighter2.skill);
        const winner = score1 > score2 ? fighter1.name : fighter2.name;
        const loser = score1 < score2 ? fighter1.name : fighter2.name;
        console.info(
            ` 🥊 ${fighter1.name} juiced up to ${Math.round(
                score1
            )}🧃 and ${fighter2.name} to ${Math.round(
                score2
            )}🧃. Best of luck to ${loser} next time!`
        );
        setWinner(winner);
        setLoser(loser);
    };

    const closeModal = () => {
        setSelectedFighters([]);
        setWinner(null);
        setLoser(null);
        setIsFightButtonClicked(false);
    };

    return (
        <section>
            <article
                class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 m-2 overflow-hidden"
            >
                {fighters.map(fighter => (
                    <div
                        key={fighter.id}
                        onClick={() => selectFighter(fighter)}
                        class={`cursor-pointer hover:border-dotted hover:border-2 hover:border-purple-400 m-0.5 hover:m-0 ${
                            selectedFighters.some(
                                selected => selected.id === fighter.id
                            )
                                ? 'border-solid border-2 border-purple-700'
                                : ''
                        }`}
                    >
                        <Fighter {...fighter} />
                    </div>
                ))}
            </article>

            {selectedFighters.length === 2 && (
                <Modal onClose={closeModal}>
                    <div
                        class="p-2 rounded-lg flex flex-col md:flex-row justify-between gap-4"
                    >
                        {selectedFighters.map(fighter => (
                            <Fighter {...fighter} />
                        ))}
                    </div>
                    <div class="flex justify-center">
                        <button
                            onClick={fight}
                            disabled={isFightButtonClicked}
                            class={`bg-purple-500 text-white py-2 px-4 rounded text-lg m-2 font-semibold text-base ${
                                isFightButtonClicked
                                    ? 'opacity-50 cursor-not-allowed'
                                    : ''
                            }`}
                        >
                            Fight!
                        </button>
                    </div>

                    {winner && (
                        <div
                            class="text-purple-700 font-semibold flex justify-center text-base mt-2 text-center"
                        >
                            🏆 {winner} demolished 💩 {loser}!{' '}
                        </div>
                    )}
                </Modal>
            )}
        </section>
    );
}
