'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import NavbarHoverDropdown from './NavbarHoverDropdown'
import { MdKeyboardArrowDown } from "react-icons/md";
import LogoutButton from './LogoutButton';
import { BounceESLoading } from './Loading';
import { MdDashboard } from "react-icons/md";
import NavigationLink from './NavigationLink';

const HeaderAuthNavigation = () => {

    const { data: session, status } = useSession({
        fetchUser: false,
    });

    return (
        <div className='flex flex-row items-center'>
            {
                status === 'loading' ?
                    <BounceESLoading /> :
                    session ?
                        <>
                            <NavigationLink className='flex flex-row items-center mr-[20px]' title={<><span>Dashboard</span><MdDashboard className='text-[30px] ml-[10px]' /></>} link={`${session.user.role === 'instructor' ? '/instructor' : session.user.role === 'student' ? '/student' : ''}/dashboard`} />
                            <LogoutButton className='hover:text-gray-300' />
                        </> :
                        <>
                            <NavbarHoverDropdown
                                title={<span className='flex flex-row items-center'><span>Sign In</span><MdKeyboardArrowDown className='text-[18px] ml-[10px]' /></span>}
                                content={[
                                    { text: 'Access Account', link: '/signin' },
                                    { text: 'Student Portal', link: '/student/signin' },
                                    { text: 'Instructor Portal', link: '/instructor/signin' },
                                ]}
                                pos={1}
                            />
                            <NavigationLink title='Sign Up' link='/signup' className='ml-[20px]' />
                        </>
            }
        </div>
    )

}

export default HeaderAuthNavigation
