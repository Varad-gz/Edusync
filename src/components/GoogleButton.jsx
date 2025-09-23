'use client'

import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const GoogleButton = () => {

    return (
        <>
            <button onClick={() => signIn('google', { callbackUrl: '/dashboard' })} className='px-[20px] py-[10px] flex flex-row items-center border-[1px] border-gray-300 rounded-full hover:bg-gray-100 transition ease-in'><FcGoogle className='mr-[10px] text-[30px]' /> <span>Continue with Google</span></button>
        </>
    )
}

export default GoogleButton
