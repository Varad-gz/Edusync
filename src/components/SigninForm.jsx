'use client'

import React, { useRef, useState, useEffect } from 'react'
import InputButton from '@/components/InputButton'
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { BounceESLoading } from '@/components/Loading';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const SigninForm = ({ type }) => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const searchParams = useSearchParams()

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("");

    useEffect(() => {
        const queryEmail = searchParams.get("email");
        if (queryEmail) {
            setEmail(queryEmail);
        }
    }, [searchParams]);

    const handleCredSignin = async (e) => {
        e.preventDefault();

        setLoading(true)

        try {
            const result = await signIn('credentials', {
                email: emailRef.current.value,
                password: passwordRef.current.value,
                type: type,
                redirect: false,
            });

            setLoading(false)

            if (result.error) {
                throw new Error(result.error);
            }

            toast.success('Login Successful', {
                autoClose: 1000,
                onClose: () => {
                    window.location.href = `${type === 2 ? '/instructor' : type === 3 ? '/student' : ''}/dashboard`;
                }
            })

        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000
            });
        }
    };

    return (
        <>
            {loading && <BounceESLoading />}
            <form className='w-full my-[30px]'>
                <div className='my-[20px]'>
                    <label htmlFor="emailId">Email:</label><br />
                    <input ref={emailRef} type="email" id="emailId" defaultValue={email} className='border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-md w-full' />
                </div>
                <div className='my-[20px]'>
                    <label htmlFor="passw">Password:</label><br />
                    <input ref={passwordRef} type="password" id="passw" className='border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-md w-full' />
                </div>
                <div className='my-[20px]'>
                    <Link href={`${type === 2 ? '/instructor' : type === 3 ? '/student' : ''}/fp`}>
                        <span className='text-teal-600 hover:text-teal-700 hover:underline'>Forgot Password?</span>
                    </Link>
                </div>
                <div className='my-[20px]'>
                    <InputButton
                        inpType='submit'
                        inpVal='Login'
                        bg='bg-teal-600'
                        hbg='hover:bg-teal-700'
                        handleClick={handleCredSignin}
                    />
                </div>
            </form>
        </>
    )
}

export default SigninForm
