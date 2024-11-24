export interface IFighter {
  "id": string;
  "full name": string;
  "rank": string;
  "division": string;
  "image": string;
  "wins": number;
  "loses": number;
  "draw": number;
  "no contest": number;
  "gender": string;
  "age": number;
  "streak": number;
  "win to loss ratio"?: number;
}
