import { getServerSession } from "next-auth"
import { authConfig } from "@/utils/authConfig"
import { redirect } from "next/navigation"

export default async function ProtectedLayout({ children }) {

    const session = await getServerSession(authConfig)

    if (session && session.user.role == 'instructor') {
        return <>{children}</>
    } else {
        redirect('/instructor/signin')
    }

}