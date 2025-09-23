import React from 'react';

const InputField = ({
    id,
    label,
    type = "text",
    defaultValue = "",
    className = "",
    onChange,
    mainDivClassname = '',
    ...props
}) => {
    return (
        <>
            <label htmlFor={id}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                className={`border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-md w-full ${className}`}
                defaultValue={defaultValue}
                onChange={onChange}
                {...props}
            />
        </>
    );
};

export default InputField;
