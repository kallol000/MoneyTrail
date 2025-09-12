import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import { UserProvider } from "./utils/lib/userContext";
import { HomeCarousel } from "@/components/ui/homeCarousel";

export default function Home() {
  return (
      <div className="grid grid-rows-12 grid-cols-10 items-center justify-items-center max-h-screen py-16">
          <div className="row-span-4 col-span-10 grid grid-cols-10 items-center">
            <h1 className="px-1 md:px-2 row-span-1 col-span-10 text-base md:text-xl lg:text-3xl font-semibold">Welcome to </h1>
            <h1 className="row-span-1 col-span-10 text-5xl md:text-7xl lg:text-9xl font-bold text-identity">MONEYTRAIL</h1>
            <Button className="text-xs px-4 row-span-1 col-span-10 mt-4 justify-self-end rounded-[50]" variant={"action"}>
              <Link className="flex items-center  " href="login">
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