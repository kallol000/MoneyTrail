'use client'
import { useEffect, useState, createContext, ReactNode, useContext, useTransition } from "react";
import axios from "axios";
import { createClient } from "../supabase/client";

import { UserDetails } from "@/app/utils/lib/types";

const supabase = createClient()


type UserContextType = {
    userDetails: UserDetails;
    refreshUserDetails: () => Promise<void>;
};
const UserContext = createContext<UserContextType>({
    userDetails: {name: "", loading: true},
    refreshUserDetails: async () => {}
}
)



export function UserProvider({children}:{children:ReactNode}) {

    const [userDetails, setUserDetails] = useState<UserDetails>({name: "", loading: true})

    const fetchUserDetails = async () => {
        const res = await axios(`/api/user/details`)
        if(res.status === 200) {
            setUserDetails(prev => res.data?.length > 0 ? ({...res.data[0], loading: false}) : ({...prev, loading: false}))
        }else if (res.status === 400) {
            console.log("There was an error")
        }
    }

    useEffect(() => {
        
        let mounted = true;

  const init = async () => {
    // ✅ make sure we have the latest session first
    const {
        data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        if (session) {
        await fetchUserDetails(); // now fetches for the correct logged-in user
        } else {
        setUserDetails({ name: "", loading: false });
        }
    };

    init();

    // ✅ subscribe to future auth changes
    const {
        data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, _session) => {
        fetchUserDetails();
    });

    return () => {
        mounted = false;
        subscription.unsubscribe();
    };
    }, [])

    


    return(
        <UserContext.Provider value={{ userDetails, refreshUserDetails: fetchUserDetails }}>
            {children}
        </UserContext.Provider>
    )

}

export const useUser = () => useContext(UserContext);
