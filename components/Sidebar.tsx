'use client';
import React from 'react';
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="global-sidebar">
      <div className="flex flex-col flex-1 gap-6">
        {sidebarLinks.map(link => {
          const isActive = link.route === pathname ||
            (pathname.startsWith(link.route) && pathname.endsWith(link.route));

          return (
            <Link
              key={link.label}
              href={link.route}
              className={cn('flex items-center justify-start gap-4 p-4 rounded-lg', { 'bg-blue-1': isActive })}
            >
              <Image src={link.imgUrl} alt={link.label} width={24} height={24} />
              <p className="font-semibold max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;