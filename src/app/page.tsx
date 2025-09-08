import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import { UserProvider } from "./utils/lib/userContext";
import { HomeCarousel } from "@/components/ui/IntroCarousel";

export default function Home() {
  return (
    // <UserProvider>
      <div className="font-sans flex flex-col gap-16 items-center justify-center max-h-screen mt-10 p-8 pb-20 sm:p-20">
        {/* <h1 className="text-5xl font-bold">Hey There!</h1> */}
        {/* <span> */}
          <div>
            <h1 className="text-5xl font-semibold">Welcome to </h1>
            <h1 className="text-9xl font-bold text-identity">MONEYTRAIL</h1>
            <div className="flex justify-end">
              <Link className="items-end" href="login">
                {/* <Button variant={"link"} > */}
                  <div className="flex items-center gap-1 hover:text-bold">
                    <div className="text-xl ">
                      <span className="font-bold text-action">Login or Sign Up</span>
                      <span> to start tracking your expenses today!</span>
                    </div>
                    <ArrowUpRightIcon className="size-5" />  
                  </div>
                {/* </Button> */}
              </Link>
            </div>
          </div>
        {/* </span> */}
        <HomeCarousel />
        
      </div>
  );
}

// </UserProvider>