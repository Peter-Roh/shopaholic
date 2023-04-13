import type { NextPage } from "next";

type ModalConfirm = {
  modalType: "Confirm";
  isOpen: boolean;
  content: JSX.Element;
  onConfirm: () => void;
  confirmText: string;
};

type ModalCancel = {
  modalType: "Cancel";
  isOpen: boolean;
  content: JSX.Element;
  onConfirm: () => void;
  confirmText: string;
  onCancel: () => void;
  cancelText: string;
};

type ModalProps = ModalConfirm | ModalCancel;

const Modal: NextPage<ModalProps> = (props) => {
  return (
    <div
      className={`absolute top-0 left-0 h-screen w-screen bg-gray-500 bg-opacity-50 ${
        props.isOpen ? "flex-x-center" : "hidden"
      }`}
    >
      <div className="flex flex-col rounded-md bg-white">
        {props.content}
        <div className="mt-auto flex h-1/6 w-full">
          {props.modalType === "Cancel" && (
            <div
              className={`flex-x-center flex-1 bg-red-500 py-2 font-medium text-slate-50 ${
                props.modalType === "Cancel" ? "rounded-bl-md" : ""
              }`}
              onClick={props.onCancel}
            >
              {props.cancelText}
            </div>
          )}
          <div
            className={`flex-x-center flex-1 bg-cyan-500 py-2 font-medium text-slate-50 ${
              props.modalType === "Cancel" ? "rounded-br-md" : "rounded-b-md"
            }`}
            onClick={() => props.onConfirm()}
          >
            {props.confirmText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
