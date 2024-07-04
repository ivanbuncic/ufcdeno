import { Head } from "$fresh/runtime.ts";
import Fighters from "../islands/Fight.tsx";

export default function Home() {
  return (
    <div>
      <Head>
        <head>
          <title>🍋 UFC fighters on Deno Fresh</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=0.9"
          ></meta>
        </head>
      </Head>
      <div class="grid items-center h-screen">
        <img
          class="mx-auto mt-5 mb-5"
          width="200px"
          src="/logoufc.jpg"
          alt="Dana, this UFC logo is for training purposes"
          title="Dana, this UFC logo is for training purposes"
        />
        <div class="mx-auto text-base font-normal text-justify  p-10 my-4 rounded">
          <p>
            {" "}
            Hello! Welcome to the most accurate UFC fight outome predictor.
          </p>
          <p>
            {" "}
            Click on two fighters and then click fight to see who will win! Use desktop for slightly better experience.
          </p>
          <p>
            {" "}
            Don't cry. Only the same category. O'Malley can fight Pennington.
          </p>
          <p>
            Support the project. Buy me a coffee{" "}
                        <a href="https://www.paypal.com/paypalme/ibuncic/3" target="_blank">
              <span class="underline">here</span>
            </a>
            . <p>Dana (UFC), pls don't shot this down, we are just playing, this is for training purposes only.</p>
          </p>
        </div>
        <Fighters />
        <div class="mx-auto py-4">
          <a href="https://fresh.deno.dev">
            <img
              class="inline"
              width="120"
              height="auto"
              src="https://fresh.deno.dev/fresh-badge.svg"
              alt="Made with Fresh"
            />
          </a>{" "}
          Support the project. Buy me a coffee{" "}
          <a href="https://www.paypal.com/paypalme/ibuncic/3" target="_blank">
            <span class="underline">here</span>
          </a>
          .
        </div>
      </div>
    </div>
  );
}
