import IFighter from "../interfaces/IFighter.tsx";

/**
 * Fighter component displays the details of a fighter
 * @param {IFighter} props
 */
export default function Fighter({
  name,
  rank,
  division,
  image,
  wins,
  loses,
}: IFighter) {
  return (
    <div
      class="mt-1 mb-2 p-2 max-w-40 lg:max-w-lg mx-auto flex flex-col items-center text-center"
      role="article"
      aria-labelledby={`${name}-name`}
      aria-describedby={`${name}-details`}
    >
      <img
        src={image}
        width={160}
        height="auto"
        loading="lazy"
        alt={`Image of fighter ${name}`}
      />
      <h1
        id={`${name}-name`}
        class="text-black text-2xl font-bold mt-2 text-center whitespace-nowrap"
      >
        {name}
      </h1>
      <div id={`${name}-details`}>
        <h3 class="text-base font-semibold">Division: {division}</h3>
        <h4 class="text-base font-bold">Rank: {rank}</h4>
        <div class="flex flex-row gap-2">
          <h5 class="text-sm">Wins: {wins}</h5>
          <h5 class="text-sm">Loses: {loses}</h5>
        </div>
      </div>
    </div>
  );
}
