import Link from "next/link";
import Overlay from "./Overlay";
import React, { useEffect, useState } from "react";

const routes = [
  {
    url: "/",
    name: "Home"
  }
]

interface Props {
  open: boolean;
  authenticated?: boolean;
  setClosed: () => void
}

export default function NavSidebar({ open, authenticated, setClosed }: Props) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(open);
  }, [open])

  if (!open) {
    return null;
  }
  return (
    <Overlay onClose={setClosed}>
      <div className={"bg-mantle-800 py-100 h-full flex flex-col text-corn-blue-400 text-lg " +
        `transition-[width] duration-150 ease-in ${animate ? "w-[250px]" : "w-[0px]"} overflow-hidden`}
      >
        Heimdall
        <hr className="border-mantle-500 my-2" />
        <div className="flex-1 flex flex-col p-2">
          {routes.map(route => (
            <div key={route.name} className="w-full">
              <Link href={route.url}>
                {route.name}
              </Link>
            </div>
          ))}
        </div>
        <div className="pb-5">
          <hr className="border-mantle-500 my-2" />
          <div className="w-full">
            {authenticated ? <Link href={"/auth/logout"}>
              Log out
            </Link> : <Link href={"/login"}>
              Login
            </Link>}
          </div>
        </div>
      </div>
    </Overlay >
  )
}