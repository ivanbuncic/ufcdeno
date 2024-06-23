import IFighter from "../interfaces/IFighter.tsx";

export default function Fighter({
  name,
  rank,
  division,
  image,
  wins,
  loses,
}: IFighter) {
  return (
    <div class="mt-2 mb-2 p-4 max-w-lg lg:max-w-md mx-auto flex flex-col items-center text-center">
      <img src={image} width={95} height="auto" loading="lazy" />
      <h1 class="text-indigo-800 text-lg font-semibold mt-2 text-center whitespace-nowrap">
        {name}
      </h1>
      <h3 class="text-base font-semibold">Division: {division}</h3>
      <h4 class="text-base font-bold">Rank: {rank}</h4>
      <div class="flex flex-row gap-2">
        <h5 class="text-sm">Wins: {wins}</h5>{" "}
        <h5 class="text-sm">Loses: {loses}</h5>
      </div>
    </div>
  );
}
