import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import { UserProvider } from "./utils/lib/userContext";
import { HomeCarousel } from "@/components/ui/IntroCarousel";

export default function Home() {
  return (
      <div className="font-sans grid gap-16 items-center max-h-screen mt-10 p-8 pb-20 sm:p-20">
          <div>
            <h1 className="text-base md:text-2xl lg:text-4xl font-semibold">Welcome to </h1>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-identity">MONEYTRAIL</h1>
            <div className="flex justify-end">
              <Link className="items-end" href="login">
                  <div className="flex items-center gap-1 hover:text-bold">
                    <div className="text-xs md:text-xl">
                      <span className="font-bold text-action">Login or Sign Up</span>
                      <span> to start tracking your expenses today!</span>
                    </div>
                    <ArrowUpRightIcon className="size-5" />  
                  </div>
              </Link>
            </div>
          </div>
        <HomeCarousel />
        
      </div>
  );
}

// </UserProvider>