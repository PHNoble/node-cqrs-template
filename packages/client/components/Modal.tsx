import React from "react";
import Portal from "./utils/Portal";
import { useOutsideClick } from "../hooks";
import Overlay from "./Overlay";

interface Props {
  onClose: () => void;
}
export default function Modal({ onClose, children }: React.PropsWithChildren<Props>) {
  return (
    <Overlay onClose={onClose} areaClassName="rounded-md shadow-md bg-mantle-800 flex p-2">
      {children}
    </Overlay>
  )
}