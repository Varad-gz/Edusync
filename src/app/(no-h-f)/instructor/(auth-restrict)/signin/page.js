import React from 'react'
import GoBackButton from '@/components/GoBackButton';
import SigninForm from '@/components/SigninForm';

const InstructorLogin = () => {
    return (
        <div className='flex flex-row h-screen'>
            <div className='w-1/2 flex justify-center items-center bg-gray-100'>
                <div className='flex flex-col'>
                    <h1 className='text-teal-600 text-[60px]'>EduSync</h1>
                    <p className='text-[20px]'>Welcome back, where your guidance creates impact.</p>
                </div>
            </div>
            <div className='w-1/2 px-[50px] py-[30px]'>
                <GoBackButton />
                <SigninForm type={2} />
            </div>
        </div>
    )
}

export default InstructorLogin
