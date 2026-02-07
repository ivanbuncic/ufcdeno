import { IFighter } from "../interfaces/IFighter.tsx";

type FighterProps = IFighter & {
  imageClassName?: string;
};

/**
 * Fighter component displays the details of a UFC fighter
 * @param {IFighter} props
 */
export default function Fighter({
  "full name": fullName,
  rank,
  division,
  image,
  wins,
  loses,
  imageClassName = "",
}: FighterProps) {
  return (
    <div
      class="mt-1 mb-2 p-2 max-w-40 lg:max-w-lg mx-auto flex flex-col items-center text-center"
      role="article"
      aria-labelledby={`${fullName}-name`}
      aria-describedby={`${fullName}-details`}
    >
      <img
        src={image}
        width={160}
        height="auto"
        loading="lazy"
        class={imageClassName}
        alt={`Image of fighter ${fullName}`}
      />
      <h1
        id={`${fullName}-name`}
        class="text-black text-2xl font-bold mt-2 text-center whitespace-nowrap"
      >
        {fullName}
      </h1>
      <div id={`${fullName}-details`}>
        <h3 class="text-base font-semibold">Division: {division}</h3>
        <h4 class="text-base font-bold">Rank: {rank}</h4>
        <div class="flex flex-row gap-2 justify-center">
          <h5 class="text-sm">Wins: {wins}</h5>
          <h5 class="text-sm">Loses: {loses}</h5>
        </div>
      </div>
    </div>
  );
}
