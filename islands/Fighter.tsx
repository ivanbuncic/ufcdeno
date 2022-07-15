/** @jsx h */
import { h } from 'preact';
import { tw } from 'twind';

interface Fighter {
  name: string;
  rank: string;
  division: string;
  image: string;
  wins: number;
  loses: number;
  draw: number;
}

export default function Fighter({
  name,
  rank,
  division,
  image,
  wins,
  loses,
  draw,
}: Fighter) {
  return (
    <div
      class={tw`mt-10 border border-black rounded-lg p-10 max-w-sm mx-auto flex flex-col items-center`}
    >
      <img src={image} width={120} height={64} />
      <h1 class={tw`text-indigo-800 text-3xl font-semibold mt-2 text-center`}>
        {name}
      </h1>
      <h3 class={tw`text-xl`}>Division: {division}</h3>
      <h4 class={tw`font-bold`}>Rank: {rank}</h4>
      <div class={tw`flex flex-row gap-2`}>
        <h5>Wins: {wins}</h5> <h5>Loses: {loses}</h5> <h5>Draw: {draw}</h5>
      </div>
    </div>
  );
}
