import { useModal } from "../../contexts/modal.context";
import Backdrop from "./Backdrop";
import Button from "./Button";

interface ModalProps {
  title: string;
}

function Modal({ title }: ModalProps) {
  const modal = useModal();
  return (
    <Backdrop>
      <article className="bg-white pt-6 pb-4 px-6 rounded-lg w-[360px] h-[120px] flex flex-col items-center justify-between">
        <h1 className="font-semibold">{title}</h1>
        <Button
          size={"sm"}
          variant={"outline"}
          intent="primary"
          onClick={modal.close}
        >
          확인
        </Button>
      </article>
    </Backdrop>
  );
}

export default Modal;
