/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Fighters from "../islands/Fighters.tsx";


export default function Home() {
    
  return (
    <div class={tw`grid items-center h-screen`}>
      <img class={tw`mx-auto mt-5 mb-5`} width="200px" src="/logoufc.jpg" alt="Dana, this UFC logo is for training purposes" title="Dana this UFC logo is for training purposes" />
      <div class={tw`mx-auto text-xl font-semibold`}>
        Hello fighters!
      </div>
       <Fighters /> 
    </div>
  );
}
