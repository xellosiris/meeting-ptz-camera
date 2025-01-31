import { useCamera } from "@/context/useCamera";
import { cn } from "@/lib/utils";
import { Home, Power, UsersRound } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

export function Layout() {
  const { camera } = useCamera();
  const { pathname } = useLocation();
  return (
    <div className="relative flex h-screen">
      <div className="absolute flex items-center gap-1 text-sm right-1 bottom-1">
        <div className={cn("bg-red-500 rounded-full size-3", camera && "bg-green-500 animate-pulse")} />
        {camera ? "connected" : "disconnected"}
      </div>
      <div className="flex flex-col items-center gap-5 py-5 w-[70px] bg-zinc-100">
        <Link to="/panel">
          <Home strokeWidth={pathname === "/panel" ? 3 : 2} />
        </Link>
        <Link to="/speakers">
          <UsersRound strokeWidth={pathname === "/speakers" ? 3 : 2} />
        </Link>
        <div className="flex-1" />
        <Link to="/connect">
          <Power strokeWidth={pathname === "/connect" || pathname === "/" ? 3 : 2} />
        </Link>
      </div>
      <div className="w-full p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
