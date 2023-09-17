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
    <div class={tw`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center`} onClick={onClose}>
      <div class={tw`bg-white rounded-lg pt-8 relative w-screen h-screen overflow-hidden transition-all items-center justify-center`} onClick={stopPropagation}>
        <button onClick={onClose} class={tw`absolute top-2.5 right-2.5 text-2xl font-bold m-2`}>X</button>
        {children}
      </div>
    </div>
  );
}
