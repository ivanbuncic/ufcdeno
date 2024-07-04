import { useEffect } from "preact/hooks";

interface ModalProps {
  children: preact.ComponentChild;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const stopPropagation = (e: Event) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    self.addEventListener("keydown", handleEscape);

    // Cleanup
    return () => {
      self.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center justify-items-center content-center z-20"
      onClick={onClose}
    >
      <div
        class="bg-white rounded-lg pt-8 relative w-screen h-screen overflow-hidden transition-all items-center justify-center"
        onClick={stopPropagation}
      >
        <button
          onClick={onClose}
          class="absolute bg-black text-white pt-1 lg:pt-2 pb-2 lg:pb-3 px-2 lg:px-4 top-1 lg:top-4 right-1 lg:right-4 font-bold lg;m-2 rounded text:base  lg:text-2xl justify-center z-50"
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
}
