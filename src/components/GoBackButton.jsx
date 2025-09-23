'use client'

import React from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation'
import PropTypes from 'prop-types';

const GoBackButton = ({ removeText = false, textColor, btnHoverColor, logoColor, btnHoverLogoColor }) => {

    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    }

    btnHoverColor = btnHoverColor === undefined ? 'hover:bg-gray-300' : btnHoverColor
    logoColor = logoColor === undefined ? '' : 'text-' + logoColor
    textColor = textColor === undefined ? 'text-gray-600' : 'text-' + textColor

    return (
        <>
            <div className='flex flex-row items-center'>
                <button onClick={handleGoBack} className={`${removeText ? '' : 'mr-[10px]'} rounded-full text-[30px] ${btnHoverLogoColor === undefined ? btnHoverColor : btnHoverLogoColor} ${logoColor}`}><IoArrowBackOutline /></button>
                {removeText ? '' : <span className={textColor}>Go Back</span>}
            </div>
        </>
    )
}

GoBackButton.propTypes = {
    removeText: PropTypes.bool,
    textColor: PropTypes.string,
    btnHoverColor: PropTypes.string,
    logoColor: PropTypes.string,
    btnHoverLogoColor: PropTypes.string
}

export default GoBackButton
