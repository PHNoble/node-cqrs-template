import React, { MouseEventHandler } from "react";

interface Props {
  secondary?: boolean;
  onClick?: MouseEventHandler
}

export default function Button({ secondary, onClick, children }: React.PropsWithChildren<Props>) {
  return (
    <button
      className={`rounded-md p-2 font-medium ${!secondary ? "bg-fern-green-600  text-white" : "bg-transparent border border-fern-green-600 text-fern-green-500"}`}
      onClick={onClick}
    >
      {children}
    </button>
  )

}