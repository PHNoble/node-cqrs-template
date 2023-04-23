import React from "react";
import Portal from "./utils/Portal";
import { useOutsideClick } from "../hooks";

interface Props {
  areaClassName?: string
  onClose: () => void;
}
export default function Overlay({ areaClassName, onClose, children }: React.PropsWithChildren<Props>) {
  const ref = React.useRef<HTMLDivElement>(null);

  useOutsideClick(ref, onClose);

  return (
    <Portal>
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-gray-800/50 flex">
        <div ref={ref} className={areaClassName ?? "flex"}>
          {children}
        </div>
      </div>
    </Portal>
  )
}