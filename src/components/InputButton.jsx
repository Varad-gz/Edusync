import React from 'react'
import PropTypes from 'prop-types'

const InputButton = ({
    inpType = 'button',
    inpVal = 'Click',
    bg = 'bg-blue-600',
    hbg = 'hover:bg-blue-700',
    textColor = 'text-white',
    handleClick }) => {
    return (
        <>
            <input
                type={inpType}
                value={inpVal}
                onClick={handleClick ? handleClick : undefined}
                className={`px-[40px] py-[10px] ${bg} ${hbg} ${textColor} cursor-pointer rounded-full transition ease-in`}
            />
        </>
    )
}

InputButton.propTypes = {
    inpType: PropTypes.string,
    inpVal: PropTypes.string,
    bg: PropTypes.string,
    hbg: PropTypes.string,
    textColor: PropTypes.string,
    handleClick: PropTypes.func
}

export default InputButton
