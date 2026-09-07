import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import { HomeCarousel } from "@/components/ui/homeCarousel";

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center gap-8 min-h-dvh px-4 py-12">
          <div className="w-full flex flex-col items-center text-center gap-2">
            <h1 className="text-base md:text-xl lg:text-3xl font-semibold">Welcome to </h1>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-identity">MONEYTRAIL</h1>
            <Button className="text-xs px-4 mt-4 rounded-[50]" variant={"action"}>
              <Link className="flex items-center" href="login">
                      <span className="font-bold ">Login or Sign Up</span>
                    <ArrowUpRightIcon className="size-5" />
              </Link>
            </Button>
          </div>
          <HomeCarousel />
      </div>
  );
}

// </UserProvider>