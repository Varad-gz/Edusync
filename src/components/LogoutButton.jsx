'use client'

import { signOut } from 'next-auth/react'
import PropTypes from 'prop-types';
import React from 'react'
import { MdOutlineLogout } from "react-icons/md";

const LogoutButton = ({ className, showText }) => {

    const handleLogout = async () => {
        signOut({ redirect: true, callbackUrl: '/' })
    }

    return (
        <>
            <button onClick={handleLogout} className={`${showText ? 'flex flex-row items-center' : ''} ${className}`}>{showText && <span className='mr-[10px]'>Logout</span>}<MdOutlineLogout className='text-[30px]' /></button>
        </>
    )
}

LogoutButton.propTypes = {
    className: PropTypes.string,
    showText: PropTypes.bool,
};

export default LogoutButton
