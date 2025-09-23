import React from 'react'
import LogoutButton from './LogoutButton'
import DashboardNavbarLinks from './DashboardNavbarLinks';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/utils/authConfig';
import Link from 'next/link';

const DashboardNavbar = async () => {

    const session = await getServerSession(authConfig)

    return (
        <div className='bg-black min-h-screen w-fit px-[30px] py-[20px] text-white text-[18px] flex flex-col items-center border-r-[2px] border-gray-900'>
            <>
                <Link href='/'>
                    <h1 className='text-[30px] text-teal-400 hover:text-teal-500'>EduSync</h1>
                </Link>
                <div className='my-[20px] whitespace-nowrap'>
                    Hello,{session.user.name}
                </div>
                <LogoutButton className='mb-[20px]' />
                <DashboardNavbarLinks role={session.user.role} method={session.user.method && session.user.method === 'google' ? false : true} />
            </>
        </div>
    )

}

export default DashboardNavbar
