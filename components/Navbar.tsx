import React from 'react';
import Image from "next/image";
import Link from "next/link";

import MobileNav from "./MobileNav";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="fixed flex-between z-50 w-full bg-dark-1 px-6 lg:px-10 py-4">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/icons/logo.svg" alt="Yoom logo" width={32} height={32} className="max-sm:size-10" />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">Yoom</p>
      </Link>

      <div className="flex-between gap-5">
        {/* ===== Clerk - user management ===== */}
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
        {/* <SignedOut>
          <SignInButton />
        </SignedOut> */}
        {/* ================================== */}

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;