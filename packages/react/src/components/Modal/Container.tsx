import React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSnapshot } from "valtio";
import { state, close } from "../../state";
import { ModalContent } from "./Content";
import { useTheme } from "../ButtonProvider";

export const Modal = (): JSX.Element => {
  const { open } = useSnapshot(state);
  const { modal } = useTheme();

  return (
    <Transition.Root show={open} as={Fragment} appear={true}>
      <Dialog as="div" className="relative z-50" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className={modal}>
              <ModalContent />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
