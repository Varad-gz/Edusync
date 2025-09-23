import PasswordChange from '@/components/PasswordChange'
import { authConfig } from '@/utils/authConfig'
import { getServerSession } from 'next-auth'
import React from 'react'

const PasswordChangePage = async () => {
    const session = await getServerSession(authConfig)
    return <PasswordChange session={session} />
}

export default PasswordChangePage
