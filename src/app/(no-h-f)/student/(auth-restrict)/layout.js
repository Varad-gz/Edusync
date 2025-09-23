import { getServerSession } from "next-auth"
import { authConfig } from "@/utils/authConfig"
import { redirect } from "next/navigation"

export default async function AuthRestrictLayout({ children }) {

    const session = await getServerSession(authConfig)

    if (session) {
        if (session.user.role === 'student')
            redirect('/editor')
        else {
            redirect('/')
        }
    }

    return <>{children}</>

}