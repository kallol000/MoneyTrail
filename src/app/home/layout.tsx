"use client"
import Navbar from "@/components/ui/navbar";
import { ReactNode, useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { logOut } from "../login/actions";
import { useUser } from "../utils/lib/userContext";
import axios from "axios";
import Spinner from "@/components/ui/spinner";

export default function Layout({children} : {children: ReactNode}) {
    
    const [username, setUsername] = useState<string>("")
    const [isFetchUserPending, startFetchUser] = useTransition()


    const fetchUserDetails = async () => {
        startFetchUser(async () => {
            const res = await axios.get(`/api/user/details`);
            const data = res.data
            if(data?.length > 0){
                setUsername(prev => data[0].name)
            }
        })
    }

    useEffect(() => {
            fetchUserDetails()
    }, [])

    return (
        <div className="grid grid-rows-25 gap-4 px-4  h-screen max-h-screen max-w-screen">
                <Navbar>
                    <h1 className="text-identity font-bold text-2xl col-span-2">MONEYTRAIL</h1>
                    <div className="flex items-center gap-4 col-[span-7/span-10]">
                        <div className="text-xs font-semibold">{isFetchUserPending ? <Spinner /> : username ? `Hi ${username}` : null}</div>
                        <form>
                            <Button size={"sm"} className="text-xs " formAction={logOut}>Logout</Button>
                        </form>
                    </div>
                </Navbar>
                {children}
                
        </div>
    )
}