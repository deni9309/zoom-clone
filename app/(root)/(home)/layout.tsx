import React, { ReactNode } from 'react';
import { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Yoom",
  description: "Create, schedule, share and join video calls.",
  icons: {
    icon: '/icons/logo.svg'
  }
};

const HomeLayout = ({ children }: { children: ReactNode; }) => {
  return (
    <main className="relative">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <section className="flex flex-col flex-1 min-h-screen px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;