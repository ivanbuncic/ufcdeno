/** @jsx h */
import { h } from 'preact';
import { tw } from 'twind';
import { fighters } from '../routes/api/data/fighters/fighters.js';
import Fighter from './Fighter.tsx';

export default function Fighters() {
  return (
    <div class={tw`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4`}>
      {fighters.map(data => {
        return (
          <div>
            <Fighter
              key={data.id}
              name={data.name}
              rank={data.rank}
              division={data.division}
              image={data.image}
              wins={data.wins}
              loses={data.loses}
              draw={data.draw}
            />
          </div>
        );
      })}
    </div>
  );
}
