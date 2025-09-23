import React from 'react'
import GoogleButton from '@/components/GoogleButton'
import GoBackButton from '@/components/GoBackButton';
import SigninForm from '@/components/SigninForm';

const UserLogin = () => {
    return (
        <>
            <div className='flex flex-row h-screen'>
                <div className='w-1/2 flex justify-center items-center bg-gray-100'>
                    <div className='flex flex-col'>
                        <h1 className='text-teal-600 text-[60px]'>EduSync</h1>
                        <p className='text-[20px]'>Simplifying processes, enhancing efficiency.</p>
                    </div>
                </div>
                <div className='w-1/2 px-[50px] py-[30px]'>
                    <GoBackButton />
                    <SigninForm type={1} />
                    <div className='my-[20px] px-[30px] py-[20px] bg-gray-100'>
                        <span>Don't have an account? <a href="/signup" className='text-teal-600 hover:text-teal-700 hover:underline'>Sign up</a></span>
                    </div>
                    <div className='pt-[30px] border-t-[2px] border-gray-100'>
                        <GoogleButton />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserLogin
