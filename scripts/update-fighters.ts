import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.48/deno-dom-wasm.ts";
import fighters from "../routes/api/data/fightersData.json" with {
  type: "json",
};
import { IFighter } from "../interfaces/IFighter.tsx";

// Fetch and parse UFC rankings from Wikipedia
async function fetchUfcRankings(): Promise<IFighter[]> {
  const url = "https://en.m.wikipedia.org/wiki/UFC_rankings";
  const response = await fetch(url);
  const html = await response.text();
  console.log(html);

  const document = new DOMParser().parseFromString(html, "text/html");
  if (!document) throw new Error("Failed to parse HTML");

  const newFighters: IFighter[] = [];

  const weightCategories = document.querySelectorAll("table.wikitable");
  weightCategories.forEach((table) => {
    const division =
      table.closest("h2")?.querySelector("span")?.textContent?.trim() ||
      "Unknown";

    const rows = table.querySelectorAll("tr");
    rows.forEach((row) => {
      const cols = row.querySelectorAll("td");
      if (cols.length < 2) return;

      const rank = cols[0]?.textContent?.trim();
      const name = cols[1]?.textContent?.trim().split("\n")[0] || "";
      const stats = cols[2]?.textContent?.match(/(\d+)[-–](\d+)([-–](\d+))?/); // Match "wins–losses–draws"

      if (rank && name && stats) {
        const wins = parseInt(stats[1], 10);
        const losses = parseInt(stats[2], 10);
        const draw = stats[4] ? parseInt(stats[4], 10) : 0;

        // Match existing fighter data
        const existingFighter = fighters.find(
          (f) => f["full name"].toLowerCase() === name.toLowerCase(),
        );

        // Calculate win-to-loss ratio
        const winLossRatio = losses > 0
          ? parseFloat(((wins / losses) * 100).toFixed(2))
          : wins > 0
          ? Infinity
          : 0;

        // Build fighter object
        newFighters.push({
          "id": existingFighter?.id || name.toLowerCase().replace(/\s+/g, "-"),
          "rank": rank,
          "division": division,
          "full name": name,
          "wins": wins,
          "loses": losses,
          "draw": draw,
          "no contest": existingFighter?.["no contest"] || 0,
          "gender": existingFighter?.gender || "unknown",
          "image": existingFighter?.image || "/photos/fighters/default.png",
          "age": existingFighter?.age || 0,
          "streak": existingFighter?.streak || 0,
          "win to loss ratio": winLossRatio,
        });
      } else {
        console.warn(`Skipping row due to missing data: ${row.textContent}`);
      }
    });
  });

  return newFighters;
}

// Write updated fighters JSON to a file
async function updateFightersJson() {
  const updatedFighters = await fetchUfcRankings();

  await Deno.writeTextFile(
    "../routes/api/data/fightersData.json", // Overwrite the existing JSON
    JSON.stringify(updatedFighters, null, 2), // Pretty print for readability
  );

  console.log("Updated fighters data saved to 'fightersData.json'");
}

// Execute the script
updateFightersJson().catch((err) => console.error("Error:", err));
