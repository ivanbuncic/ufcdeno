/** @jsx h */
import { h } from 'preact';
import { tw } from 'twind';

interface ModalProps {
  children: preact.ComponentChild;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const stopPropagation = (e: Event) => {
    e.stopPropagation();
  };

  return (
    <div class={tw`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center justify-items-center content-center`} onClick={onClose}>
      <div class={tw`bg-white rounded-lg pt-8 relative w-screen h-screen overflow-hidden transition-all items-center justify-center`} onClick={stopPropagation}>
        <button onClick={onClose} class={tw`absolute bg-purple-500 p-2 top-4 right-4 font-bold m-2 rounded font-semibold text-base`}>X</button>
        {children}
      </div>
    </div>
  );
}
