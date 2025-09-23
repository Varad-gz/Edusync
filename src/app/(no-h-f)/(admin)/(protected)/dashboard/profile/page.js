import ProfileForm from '@/components/ProfileForm'
import { authConfig } from '@/utils/authConfig'
import prisma from '@/utils/prismaClient'
import { getServerSession } from 'next-auth'
import React from 'react'

const Profile = async () => {

    const session = await getServerSession(authConfig)
    const data = await prisma.admin.findUnique({
        where: {
            email: session.user.email
        },
        select: {
            middleName: true,
            lastName: true,
            address: true,
            contact: true,
        }
    })

    return <ProfileForm session={session} data={data} postapi='/api/admin/update' />
}

export default Profile
