'use client';
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-ful max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image src="/icons/hamburger.svg" alt="menu" width={36} height={36} className="cursor-pointer sm:hidden" />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/icons/logo.svg"
              alt="Yoom logo"
              width={32}
              height={32}
            />
            <p className="text-[26px] font-extrabold text-white">Yoom</p>
          </Link>
          <div className="flex flex-col justify-between overflow-y-auto h-[calc(100vh-72px)]">
            <SheetClose asChild>
              <section className="flex flex-col gap-6 h-full pt-16 text-white">
                {sidebarLinks.map(link => {
                  const isActive = link.route === pathname ||
                    (pathname.startsWith(link.route) && pathname.endsWith(link.route));

                  return (
                    <SheetClose asChild key={link.route}>
                      <Link href={link.route}
                        className={cn('flex items-center w-full max-w-60 gap-4 p-4 rounded-lg', {
                          'bg-blue-1': isActive,
                        })}
                      >
                        <Image src={link.imgUrl} alt={link.label} width={20} height={20} />
                        <p className="font-semibold">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;