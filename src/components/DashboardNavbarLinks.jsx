'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const BDNavbarLink = ({ title, link }) => {
    const pathname = usePathname();
    return (
        <li className='my-[10px]'>
            <Link className={pathname === link ? 'text-teal-400' : ''} href={link}>{title}</Link>
        </li>
    )
}

export default function DashboardNavbarLinks({ role, method }) {

    const roleprep = role === 'student' ? '/student' : role === 'instructor' ? '/instructor' : '';

    return (
        <ul className='flex flex-col items-center border-t-[1px] border-gray-800 pt-[10px] whitespace-nowrap'>
            <BDNavbarLink title='Dashboard' link={`${roleprep}/dashboard`} />
            <BDNavbarLink title='Profile' link={`${roleprep}/dashboard/profile`} />
            {
                method ?
                    <BDNavbarLink title='Change Password' link={`${roleprep}/dashboard/password-change`} /> :
                    <></>
            }
        </ul>
    )
}