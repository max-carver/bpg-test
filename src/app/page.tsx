import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="gutter page-height">
      <section className="flex flex-col items-center justify-center gap-8">
        <Image src="/bond.svg" alt="logo" width={280} height={280} />
        <p className="text-center text-2xl">
          Start sending and receiving pings
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
