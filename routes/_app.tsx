import { PageProps } from "fresh";
import { asset } from "fresh/runtime";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content=" Hello! Welcome to the most accurate UFC fight outcome predictor.  Click on two fighters and then click fight to see who will win! Use desktop for slightly better experience.  Don't cry. Only the same category. O'Malley can fight Pennington. Support the project. Dana (UFC), pls don't shot this down, we are just playing, this is for training purposes only."
        />
        <meta
          name="keywords"
          content="ufc, ufc fight prediction, fight outcome, who will win, win ufc fight, loosing a fight"
        />
        <title>🍋 UFC fight predictor on Deno Fresh</title>
        <link rel="stylesheet" href={asset("/styles.css")} />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
