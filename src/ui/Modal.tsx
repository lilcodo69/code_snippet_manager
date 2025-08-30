import {
  cloneElement,
  createContext,
  useContext,
  useState,
  type HTMLProps,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import useOutsideClick from "../hooks/useOutsideClick";

interface ModalContextType {
  openName: string;
  open: (name: string) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

interface ModalProp {
  children: React.ReactNode;
}

export const Modal = ({ children }: ModalProp) => {
  const [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

interface OpenProps {
  children: ReactElement<HTMLProps<HTMLElement>>;
  // open: (opens:string)=>void;
  opens: string;
}

function Open({ children, opens }: OpenProps) {
  const { open } = useModalContext();
  return cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      open(opens);
      e.stopPropagation();
    },
  });
}

interface ModalChildProps {
  onCloseModal: () => void;
}

interface WindowProps {
  children: React.ReactElement<ModalChildProps>;
  name: string;
  onCloseModal?: () => void;
}

function Window({ children, name }: WindowProps) {
  const { openName, close } = useModalContext();

  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300">
      <div ref={ref} onClick={(e) => e.stopPropagation()}>
        <button onClick={close}>
          <HiXMark />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>,
      </div>
    </div>,
    document.body
  );
}

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === null) {
    throw new Error("useModalContext must be used within a Modal provider");
  }
  return context;
};

// This part is perfect! It's how you create the compound component.
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
