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
})

export function UserProvider({children}:{children:ReactNode}) {

    const [userDetails, setUserDetails] = useState<UserDetails>({name: "", loading: true})

     const fetchUserDetails = async () => {
        setUserDetails({ name: "", loading: true });  // Always reset before fetching
        const res = await axios(`/api/user/details`);
        if (res.status === 200) {
            setUserDetails(
                res.data?.length > 0
                    ? { ...res.data[0], loading: false }
                    : { name: "", loading: false }
            );
        } else {
            console.log("Error fetching user details");
            setUserDetails({ name: "", loading: false });
        }
    };


    useEffect(() => {
        // Subscribe to auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === "SIGNED_OUT") {
                    // Reset userDetails on logout
                    setUserDetails({ name: "", loading: false });
                } else if (event === "SIGNED_IN") {
                    fetchUserDetails();
                }
            }
        );

        // Initial fetch (if user already signed in)
        fetchUserDetails();

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);


    


    return(
        <UserContext.Provider value={{ userDetails, refreshUserDetails: fetchUserDetails }}>
            {children}
        </UserContext.Provider>
    )

}

export const useUser = () => useContext(UserContext);
