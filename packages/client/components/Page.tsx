import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons"
import NavSidebar from "./NavSidebar";
import { useUser } from "../hooks/useUser";
import { useRouter } from "next/dist/client/router";
import { routes } from "../utils";
import Loading from "./Loading";


export default function Page({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { user, error, isLoading: userLoading } = useUser();
  const isLoading = userLoading && !mounted;
  const path = router.pathname;
  const route = routes.find(route => route.url === path)
  const { title, noHeader, guarded } = route ?? {};
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      if (!route) {
        router.replace("/404")
      }
    }
  }, []);

  useEffect(() => {
    if (guarded && !user && !userLoading) {
      router.replace("/login");
    }
  }, [user, userLoading])

  if (isLoading || (!user && guarded)) {
    return <Loading />
  }



  return (
    <div className="flex-1 flex flex-col relative">
      {!noHeader ? <PageHeader title={title ?? "404"} authenticated={!!user} /> : null}
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