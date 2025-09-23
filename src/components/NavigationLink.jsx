import Link from 'next/link'
import React from 'react'

const NavigationLink = ({ link, title, className }) => {
    return (
        <>
            <Link href={link}>
                <h1 className={`hover:text-gray-300 w-fit whitespace-nowrap ${className}`}>{title}</h1>
            </Link>
        </>
    )
}

export default NavigationLink
