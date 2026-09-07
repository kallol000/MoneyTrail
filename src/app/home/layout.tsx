"use client"
import Navbar from "@/components/ui/navbar";
import { ReactNode, useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { logOut } from "../login/actions";
import axios from "axios";
import Spinner from "@/components/ui/spinner";
import { useMediaQuery } from "../utils/lib/hooks/useMediaQuery";
import { Power } from "@/components/ui/icons";

export default function Layout({children} : {children: ReactNode}) {
    
    const [username, setUsername] = useState<string>("")
    const [isFetchUserPending, startFetchUser] = useTransition()
    const isDesktop = useMediaQuery("(min-width:768px)"); //to dynamically render components based on screen size

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
        <div className="flex flex-col gap-4 px-4 h-dvh max-h-dvh max-w-screen">
                <Navbar>
                    <h1 className="text-identity font-bold text-2xl">MONEYTRAIL</h1>
                    <div className="flex items-center gap-4">
                        <div className="text-xs font-semibold">{isFetchUserPending ? <Spinner /> : username ? `Hi ${username}` : null}</div>
                        <form>
                            {!isDesktop ?
                                <Button key={"1"} variant={"ghost"} size={"sm"} className="text-xs " formAction={logOut}><Power /> </Button>
                                :
                                <Button key={"2"} size={"sm"} className="text-xs " formAction={logOut}>Logout</Button>
                            }
                        </form>
                    </div>
                </Navbar>
                <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-4
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar]:h-2
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                    {children}
                </div>
        </div>
    )
}