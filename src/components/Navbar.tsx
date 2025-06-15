"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PROTECTED_ROUTES } from "@/lib/routes";

const Navbar = () => {
  const pathname = usePathname();
  if (PROTECTED_ROUTES.includes(pathname)) {
    return null;
  }

  return (
    <header className="gutter flex h-16 items-center justify-between">
      <nav className="flex w-full items-center justify-between gap-2">
        <Link href="/">
          <Image src="/bond.svg" alt="logo" width={128} height={128} />
        </Link>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
