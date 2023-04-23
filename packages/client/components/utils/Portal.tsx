import React from "react";
import ReactDOM from "react-dom";

export default function Portal({ children }: React.PropsWithChildren<{}>) {
  return ReactDOM.createPortal(children, document.body);
}