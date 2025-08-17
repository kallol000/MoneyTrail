import Navbar from "@/components/ui/navbar";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { logOut } from "../login/actions";
import UserTabs from "@/components/ui/userTabs";
import Link from "next/link";

export default function Layout({children, dashboard} : {children: ReactNode, dashboard: ReactNode}) {
    return(
        <div className="flex flex-col gap-4">
            <Navbar>
                <h1 className="text-identity font-bold text-2xl">MONEYTRAIL</h1>
                <form>
                    <Button formAction={logOut}>Logout</Button>
                </form>
            </Navbar>
            {/* <Link href={'/timeSeries'}>6 months</Link> */}
            {/* <UserTabs /> */}
            {children}
            {dashboard}
        </div>
    )
}