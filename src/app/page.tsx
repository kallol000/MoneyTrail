import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";

export default function Home() {
  return (
    <div className="font-sans grid  items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20">
      <h1 className="text-5xl font-bold">Hey There!</h1>
      <h1 className="text-5xl font-bold">Welcome to ABCD</h1>
      <Link href="login">
        <Button>
          <div>Login or SignUp to start tracking your expenses today!</div>
          <ArrowUpRightIcon />  
        </Button>
      </Link>
      
    </div>
  );
}
