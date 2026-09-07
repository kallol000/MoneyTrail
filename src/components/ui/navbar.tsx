import { ReactNode } from "react";

export default function Navbar({children} : {children: ReactNode}) {
    return(
        <div className="py-2 sm:py-0 shrink-0 flex items-center justify-between gap-4 shadow-xs">
            {children}
        </div>
    )
}