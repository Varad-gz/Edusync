'use client'

import Link from 'next/link';
import React, { useState } from 'react';

const HoverDropdown = ({ title, content, mainDivCSS, pos }) => {
    const [isHovered, setIsHovered] = useState(false);

    const positionClasses = {
        0: 'left-0',
        1: 'right-0',
    };

    const positionClass = positionClasses[pos] || 'left-1/2 transform -translate-x-1/2';

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            className={`relative ${mainDivCSS}`}
        >
            <div
                className='cursor-pointer hover:text-gray-300'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                {title}
            </div>
            {isHovered && (
                <div
                    className={`absolute bg-zinc-900 shadow-md text-white z-20 ${positionClass}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <ul className="text-[18px]">
                        {content.map((item, index) => (
                            <Link key={index} href={item.link} className="cursor-pointer">
                                <div className='hover:bg-teal-500 hover:text-black transition ease-in-out delay-100 px-[10px] py-[5px]'>
                                    <li className='p-[10px] whitespace-nowrap'>
                                        {item.text}
                                    </li>
                                </div>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default HoverDropdown;
