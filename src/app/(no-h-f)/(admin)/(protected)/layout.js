
import { authConfig } from "@/utils/authConfig";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"
import React from "react";

export default async function ProtectedLayout({ children }) {

    const session = await getServerSession(authConfig)

    if (session && session.user.role == 'admin') {
        return <>{children}</>;
    } else {
        redirect('/signin')
    }

}