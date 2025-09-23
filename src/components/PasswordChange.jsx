'use client'
import React, { useState, useRef } from 'react'
import { toast } from 'react-toastify';
import RequiredIndicator from './RequiredIndicator';
import { signOut } from 'next-auth/react';

const PasswordChange = ({ session }) => {

    const formRef = useRef(null)

    const [isValidated, setIsValidated] = useState({
        password: false,
        rpassword: false
    });

    const [lowercaseCheck, setLowercaseCheck] = useState(false)
    const [uppercaseCheck, setUppercaseCheck] = useState(false)
    const [digitCheck, setDigitCheck] = useState(false)
    const [specialCharCheck, setSpecialCharCheck] = useState(false)
    const [minimumChars, setMinimumChars] = useState(false)

    const [errors, setErrors] = useState({});

    const [passVals, setPassVals] = useState({});

    const passwordValidate = (e) => {
        const { name, value } = e.target;
        setPassVals({ ...passVals, [name]: value });

        const lowercase = /[a-z]/.test(value);
        const uppercase = /[A-Z]/.test(value);
        const digit = /\d/.test(value);
        const specialChar = /[@$!%*?&]/.test(value);
        const minLength = value.length >= 8;

        setLowercaseCheck(lowercase);
        setUppercaseCheck(uppercase);
        setDigitCheck(digit);
        setSpecialCharCheck(specialChar);
        setMinimumChars(minLength);

        const allConditionsMet = lowercase && uppercase && digit && specialChar && minLength;
        setIsValidated({ ...isValidated, [name]: allConditionsMet });
        setErrors({ ...errors, [name]: '' })
    }

    const retypePasswordValidate = (e) => {
        const { name, value } = e.target;
        setPassVals({ ...passVals, [name]: value });

        if (!value) {
            setIsValidated({ ...isValidated, [name]: false });
            setErrors({ ...errors, [name]: 'Please retype the password' });
            return;
        }
        if (passVals.password !== value) {
            setIsValidated({ ...isValidated, [name]: false });
            setErrors({ ...errors, [name]: "Passwords don't match" });
            return;
        }

        setIsValidated({ ...isValidated, [name]: true });
        setErrors({ ...errors, [name]: '' });
    }

    const handleSubmit = async () => {
        let verrors = {}
        if (isValidated.password && isValidated.rpassword) {

            const form = formRef.current;
            const formDataObject = {};

            for (let i = 0; i < form.elements.length; i++) {
                const input = form.elements[i];
                if (input.name) {
                    formDataObject[input.name] = input.value;
                }
            }

            formDataObject['id'] = session.user.id;

            try {
                const api = `/api/${session.user.role}/update-password`
                const response = await fetch(api, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataObject)
                })

                const data = await response.json()

                if (data.message) {
                    toast.success(data.message, {
                        autoClose: 3000,
                        onClose: () => {
                            signOut({ redirect: true, callbackUrl: `${session.user.role !== 'admin' ? ('/' + session.user.role) : ''}/signin` });
                        }
                    })
                } else {
                    toast.error(data.error, {
                        autoClose: 2000
                    })
                }

            } catch (err) {
                toast.error(err.message);
            }

        } else {

            const perrors = [];
            if (!minimumChars) perrors.push("Minimum eight characters");
            if (!lowercaseCheck) perrors.push("One lowercase letter");
            if (!uppercaseCheck) perrors.push("One uppercase letter");
            if (!digitCheck) perrors.push("One number");
            if (!specialCharCheck) perrors.push("One special character");

            if (perrors.length > 0) verrors.password = perrors.join(', ')
            if (!isValidated.rpassword) verrors.rpassword = 'Please retype the password'

            setErrors({ ...errors, ...verrors })
            verrors = {}
        }
    };

    return (
        <div className='p-[30px] w-full flex flex-col bg-zinc-950 text-white'>
            <div>
                <h1 className='text-[20px]'>Change Password</h1>
            </div>
            <form onSubmit={(e) => { e.preventDefault() }} ref={formRef}>
                <div className='w-1/2 mt-[20px]'>
                    <label htmlFor="cpassword"><RequiredIndicator />Current Password:</label><br />
                    <input
                        type="password"
                        id="cpassword"
                        name="cpassword"
                        className={`bg-zinc-900 focus:border-[1px] focus:border-teal-800 outline-none px-[10px] py-[5px] rounded-md w-full`}
                    />
                </div>
                <div className='flex flex-row mt-[20px] w-1/2'>
                    <div className='flex flex-col w-full whitespace-nowrap'>
                        <div className='mb-[20px]'>
                            <label htmlFor="password"><RequiredIndicator />New Password:</label><br />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={`bg-zinc-900 focus:border-[1px] focus:border-teal-800 outline-none px-[10px] py-[5px] rounded-md w-full ${errors.password ? 'border-red-500' : 'border-gray-200'} ${(passVals.rpassword) && 'text-gray-400 cursor-default'}`}
                                onChange={passwordValidate}
                                readOnly={passVals.rpassword}
                            />
                            {errors.password && <p className="text-red-500 text-sm whitespace-normal">{errors.password}</p>}
                        </div>
                        <div className='my-[20px]'>
                            <label htmlFor="rpassword"><RequiredIndicator />Retype Password:</label><br />
                            <input
                                type="password"
                                id="rpassword"
                                name="rpassword"
                                className={`bg-zinc-900 focus:border-[1px] focus:border-teal-800 outline-none px-[10px] py-[5px] rounded-md w-full ${errors.rpassword ? 'border-red-500' : 'border-gray-200'} ${(!passVals.password) && 'text-gray-400 cursor-default'}`}
                                onChange={retypePasswordValidate}
                                readOnly={!passVals.password}
                            />
                            {errors.rpassword && <p className="text-red-500 text-sm">{errors.rpassword}</p>}
                        </div>
                    </div>
                    <div className='ml-[20px] text-[15px] bg-gray-800 w-fit whitespace-nowrap p-[10px]'>
                        <p>
                            <span className={minimumChars ? 'text-green-600' : 'text-red-500'}>Minimum eight characters</span><br />
                            <span className={uppercaseCheck ? 'text-green-600' : 'text-red-500'}>At least one uppercase letter</span><br />
                            <span className={lowercaseCheck ? 'text-green-600' : 'text-red-500'}>At least one lowercase letter</span><br />
                            <span className={digitCheck ? 'text-green-600' : 'text-red-500'}>At least one number</span><br />
                            <span className={specialCharCheck ? 'text-green-600' : 'text-red-500'}>At least one special character<br />(@, $, !, %, ?, &)</span>
                        </p>
                    </div>
                </div>
                <div className="my-[20px]">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-teal-600 hover:bg-teal-700 text-white py-[10px] px-[20px] rounded-md"
                    >
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PasswordChange
