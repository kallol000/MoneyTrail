import Navbar from "@/components/ui/navbar";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { logOut } from "../login/actions";


export default function Layout({children} : {children: ReactNode}) {
    return(
        <div>
            <Navbar>
                <h1 className="text-identity font-bold text-2xl">MONEYTRAIL</h1>
                <form>
                    <Button formAction={logOut}>Logout</Button>
                </form>
            </Navbar>
            {children}
        </div>
    )
}