import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons"
import Overlay from "./Overlay";
import Link from "next/link";
import NavSidebar from "./NavSidebar";
import { useUser } from "../hooks/useUser";
import { Router, useRouter } from "next/dist/client/router";

interface Props {
  title: string;
  noHeader?: boolean;
  guarded?: boolean;
}

export default function Page({ title, noHeader, guarded, children }: React.PropsWithChildren<Props>) {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  if (guarded && !user) {
    router.replace("/login");
    return null
  }
  console.log(user)
  return (
    <div className="flex-1 flex flex-col relative">
      {!noHeader ? <PageHeader title={title} authenticated={!!user} /> : null}
      {!isLoading || !guarded ? <div className="flex-1 flex">
        {children}
      </div> :
        <div className="flex-1 flex items-center justify-center">
          <span className="p-5 rounded-full bg-fern-green-600 animate-bounce" />
        </div>}
    </div>
  )
}

interface PageHeaderProps {
  title: string;
  authenticated?: boolean;
}

export function PageHeader({ title, authenticated }: PageHeaderProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <div className="sticky top-0 w-full flex bg-mantle-800 shadow-sm py-2 px-4 items-center gap-10">
      <button onClick={() => setSidebarOpen(true)}>
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>
      <h1 className="text-fern-green-500 text-xl">{title}</h1>
      <NavSidebar open={sidebarOpen} setClosed={() => setSidebarOpen(false)} authenticated={authenticated} />
    </div >
  )
}