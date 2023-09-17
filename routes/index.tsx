/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import { Head } from '$fresh/runtime.ts';
import Fighters from '../islands/Fighters.tsx';

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
            <div class={tw`grid items-center h-screen`}>
                <img
                    class={tw`mx-auto mt-5 mb-5`}
                    width="200px"
                    src="/logoufc.jpg"
                    alt="Dana, this UFC logo is for training purposes"
                    title="Dana, this UFC logo is for training purposes"
                />
                <div class={tw`mx-auto text-xl font-semibold p-2 text-center`}>
                    Hello! Click on two fighters and then click fight to see who
                    will win! Don't cry.
                </div>
                <Fighters />
                <div class={tw`mx-auto py-4`}>
                    <a href="https://fresh.deno.dev">
                        <img
                            width="120"
                            height="auto"
                            src="https://fresh.deno.dev/fresh-badge.svg"
                            alt="Made with Fresh"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}
