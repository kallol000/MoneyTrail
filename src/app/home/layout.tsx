"use client"
import Navbar from "@/components/ui/navbar";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { logOut } from "../login/actions";
import { useUser } from "../utils/lib/userContext";

export default function Layout({children} : {children: ReactNode}) {
    const {userDetails} = useUser()
    
    console.log(userDetails)

    return (
        <div className="flex flex-col gap-4 min-h-screen">
            <Navbar>
                <h1 className="text-identity font-bold text-2xl">MONEYTRAIL</h1>
                <div className="flex items-center gap-4">
                    <p className="font-semibold">{userDetails.name ? `Hi ${userDetails.name}` : null}</p>
                    <form>
                        <Button formAction={logOut}>Logout</Button>
                    </form>
                </div>
            </Navbar>
            {/* <Link href={'/timeSeries'}>6 months</Link> */}
            {/* <UserTabs /> */}
                {children}
        </div>
    )
}