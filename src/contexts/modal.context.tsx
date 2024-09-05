import { ReactNode, createContext, useContext, useState } from "react";
import Modal from "../components/atom/Modal";

interface ModalOptions {
  title: string;
}

const initialValue = {
  open: (_options: ModalOptions) => {},
  close: () => {},
};

const ModalContext = createContext<typeof initialValue>(initialValue);

export const useModal = () => useContext(ModalContext);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);
  const value = {
    open: (_options: ModalOptions) => {
      setModalOptions(_options);
    },
    close: () => {
      setModalOptions(null);
    },
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalOptions && <Modal title={modalOptions.title} />}
    </ModalContext.Provider>
  );
}
