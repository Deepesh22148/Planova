"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { House, Info, User, Wrench } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Slot } from "@radix-ui/react-slot";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

const Topbar = () => {
  const { data: session } = useSession() ?? "";
  const [username, setUsername] = React.useState<string>("");
  React.useEffect(() => {
    if (session) {
      setUsername((session.user as any).username);
    }
  }, [session]);
  const pathname = usePathname();
  const active =
    "relative text-blue-600 font-semibold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-blue-400 after:to-blue-600 after:rounded-full after:transition-all after:duration-300";
  const normal =
    "relative text-gray-700 hover:text-blue-600 transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-blue-400 after:to-blue-600 after:rounded-full hover:after:w-full after:transition-all after:duration-300";

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-md shadow-sm h-16 text-black font-playfair-display">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        <div className="flex items-center space-x-4 hover:cursor-pointer h-full px-3">
          <Image
            src="/favicon.png"
            alt="logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span className="text-2xl font-semibold ">Planova</span>
        </div>

        <div className={"flex w-1/2 p-2 justify-around items-center"}>
          <Link href="/" className={pathname === "/" ? active : normal}>
            <div className={"flex items-center p-2 gap-4"}>
              <House className={"h-4 w-4 "} />
              <span>Home</span>
            </div>
          </Link>

          <Link
            href="/services"
            className={pathname === "/services" ? active : normal}
          >
            <div className={"flex items-center p-2 gap-2"}>
              <Wrench className={"h-4 w-4"} />
              <span>Services</span>
            </div>
          </Link>

          <Link
            href="/about"
            className={pathname === "/about" ? active : normal}
          >
            <div className={"flex items-center p-2 gap-2"}>
              <Info className={"h-4 w-4"} />
              <span>About</span>
            </div>
          </Link>

          {!session ? (
            <Slot>
              <>
                <Link
                  href="/auth/sign-in"
                  className={pathname === "/auth/sign-in" ? active : normal}
                >
                  <div className={"flex items-center p-2 gap-2"}>
                    <span>Sign In</span>
                  </div>
                </Link>

                <Link
                  href="/auth/sign-up"
                  className={pathname === "/auth/sign-up" ? active : normal}
                >
                  <div className={"flex items-center p-2 gap-2"}>
                    <span>Sign Up</span>
                  </div>
                </Link>
              </>
            </Slot>
          ) : (
            <Slot>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuItem className="min-w-[10rem]">
                      <NavigationMenuTrigger className="w-full min-w-[10rem] text-gray-700 hover:text-blue-600 flex items-center gap-2 cursor-pointer">
                        <User className="w-4 h-4" />
                        {username}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="w-full min-w-[10rem]">
                        <div
                          className="w-full hover:cursor-pointer text-sm hover:bg-gray-100 text-center px-4 py-2"
                          onClick={() => signOut()}
                        >
                          Sign Out
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </Slot>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
