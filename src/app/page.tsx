import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";

export default function Home() {
  return (
    <div className="font-sans  items-center justify-items-center min-h-screen p-8 m-20 pb-20 sm:p-20">
      {/* <h1 className="text-5xl font-bold">Hey There!</h1> */}
      <span>
        <h1 className="text-5xl font-semibold">Welcome to </h1>
        <h1 className="text-9xl font-bold text-identity">MONEYTRAIL</h1>
      </span>
      <Link href="login">
        {/* <Button variant={"link"} > */}
          <div className="flex items-center gap-1 hover:text-bold">
            <div className="text-xl ">Login or SignUp to start tracking your expenses today!</div>
            <ArrowUpRightIcon className="size-5" />  
          </div>
        {/* </Button> */}
      </Link>
      
    </div>
  );
}
