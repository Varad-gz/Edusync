'use client'

import React from 'react'
import HeaderAuthNavigation from './HeaderAuthNavigation';
import NavigationLink from './NavigationLink';

const Header = () => {
    return (
        <div>
            <nav className='px-[30px] bg-black text-white text-[18px]'>
                <div className='flex flex-row justify-between h-[80px]'>
                    <div className='flex flex-row items-center'>
                        <a href='/'>
                            <div className='w-fit pr-[20px] mr-[20px] border-r-[2px] border-r-teal-400'>
                                <h1 className='text-[30px] text-teal-400 hover:text-teal-500'>EduSync</h1>
                            </div>
                        </a>
                        <NavigationLink title='Pricing' link='/pricing' className='mr-[20px]' />
                        <NavigationLink title='Editor' link='/editor' />
                    </div>
                    <HeaderAuthNavigation />
                </div >
            </nav >
        </div >
    )
}

export default Header
