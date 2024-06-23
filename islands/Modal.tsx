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
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center justify-items-center content-center"
      onClick={onClose}
    >
      <div
        class="bg-white rounded-lg pt-8 relative w-screen h-screen overflow-hidden transition-all items-center justify-center"
        onClick={stopPropagation}
      >
        <button
          onClick={onClose}
          class="absolute bg-purple-500 text-white p-2 top-4 right-4 font-bold m-2 rounded  text-base"
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
}
