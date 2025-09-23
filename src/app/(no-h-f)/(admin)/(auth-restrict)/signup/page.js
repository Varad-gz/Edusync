'use client'
import React, { useState, useRef } from 'react'
import InputButton from '@/components/InputButton'
import GoBackButton from '@/components/GoBackButton';
import RequiredIndicator from '@/components/RequiredIndicator'
import { toast } from 'react-toastify';

const UserRegistration = () => {

    const emailRef = useRef(null)
    const formRef = useRef(null)

    const [isValidated, setIsValidated] = useState({
        fname: false,
        lname: false,
        email: false,
        contact: false,
        address: false,
        password: false,
        rpassword: false
    });

    const [errors, setErrors] = useState({});

    const [step, setStep] = useState(1);

    const [passVals, setPassVals] = useState({});

    const [lowercaseCheck, setLowercaseCheck] = useState(false)
    const [uppercaseCheck, setUppercaseCheck] = useState(false)
    const [digitCheck, setDigitCheck] = useState(false)
    const [specialCharCheck, setSpecialCharCheck] = useState(false)
    const [minimumChars, setMinimumChars] = useState(false)

    const [locked1, setLocked1] = useState(false);
    const [locked2, setLocked2] = useState(false);
    const [locked3, setLocked3] = useState(false);

    const [cooldown, setCooldown] = useState(false);

    const fnameValidate = (e) => {
        const { name, value } = e.target;
        if (!value) {
            setIsValidated({ ...isValidated, [name]: false })
            setErrors({ ...errors, [name]: 'First Name is required' });
            return
        }
        setIsValidated({ ...isValidated, [name]: true })
        setErrors({ ...errors, [name]: '' })
    }

    const lnameValidate = (e) => {
        const { name, value } = e.target;
        if (!value) {
            setIsValidated({ ...isValidated, [name]: false })
            setErrors({ ...errors, [name]: 'Last Name is required' });
            return
        }
        setIsValidated({ ...isValidated, [name]: true })
        setErrors({ ...errors, [name]: '' })
    }

    const emailValidate = (e) => {
        const { name, value } = e.target;
        if (!value) {
            setIsValidated({ ...isValidated, [name]: false })
            setErrors({ ...errors, [name]: 'Email is required' });
            return
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setIsValidated({ ...isValidated, [name]: false })
            setErrors({ ...errors, [name]: 'Invalid email address' });
            return
        }
        setIsValidated({ ...isValidated, [name]: true })
        setErrors({ ...errors, [name]: '' })
    }

    const contactValidate = (e) => {
        const { name, value } = e.target;
        if (!value) {
            setIsValidated({ ...isValidated, [name]: false })
            setErrors({ ...errors, [name]: 'Contact Number is required' });
            return
        }
        const phoneRegex = /^(?:0|(?:\+91)|91|00)?([6-9]\d{9})$/;
        const match = value.match(phoneRegex);
        if (!match) {
            setIsValidated({ ...isValidated, [name]: false });
            setErrors({ ...errors, [name]: 'Invalid mobile number' });
            return
        }

        e.target.value = match[1]
        setIsValidated({ ...isValidated, [name]: true })
        setErrors({ ...errors, [name]: '' })
    }

    const addressValidate = (e) => {
        const { name, value } = e.target;
        if (!value) {
            setIsValidated({ ...isValidated, [name]: false })
            setErrors({ ...errors, [name]: 'Address is required' });
            return
        }
        setIsValidated({ ...isValidated, [name]: true })
        setErrors({ ...errors, [name]: '' })
    }

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

    const validateAndProceed = async (e) => {
        e.preventDefault()
        let verrors = {}
        if (step === 1) {
            if (isValidated.fname && isValidated.lname && isValidated.email) {

                if (!cooldown) {

                    const email = emailRef.current.value;

                    try {
                        const response = await fetch(`/api/admin/email-exists?email=${encodeURIComponent(email)}`);
                        const result = await response.json();

                        setCooldown(true)

                        if (result.exists) {
                            toast.error('Email already exists')
                            setTimeout(() => {
                                setCooldown(false)
                            }, 5000)
                        } else {
                            setLocked1(true)
                            setStep(2);
                        }
                    } catch (err) {
                        toast.error(err.message);
                    }
                } else {
                    toast.warn('Slow down! Please wait a few seconds before retrying.')
                }

            } else {

                if (!isValidated.fname) verrors.fname = 'First Name is required'
                if (!isValidated.lname) verrors.lname = 'Last Name is required'
                if (!isValidated.email) verrors.email = 'Email is required'

                setErrors({ ...errors, ...verrors })
                verrors = {}
            }
        } else if (step === 2) {
            if (isValidated.contact && isValidated.address) {
                setLocked2(true)
                setStep(3)
            } else {

                if (!isValidated.contact) verrors.contact = 'Contact Number is required'
                if (!isValidated.address) verrors.address = 'Address is required'

                setErrors({ ...errors, ...verrors })
                verrors = {}
            }
        } else if (step === 3) {
            if (isValidated.password && isValidated.rpassword) {
                setLocked3(true);

                const form = formRef.current;
                const formDataObject = {};

                for (let i = 0; i < form.elements.length; i++) {
                    const input = form.elements[i];
                    if (input.name) {
                        formDataObject[input.name] = input.value;
                    }
                }

                try {
                    const response = await fetch('/api/admin/create', {
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
                                window.location.href = '/signin';
                            }
                        })
                    } else {
                        toast.error(data.error, {
                            autoClose: 2000,
                            onClose: () => {
                                window.location.reload()
                            }
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
        }
    };

    return (
        <div className='flex flex-row'>
            <div className='w-1/2 bg-gray-100 min-h-screen'>
                <div className='h-screen flex justify-center items-center'>
                    <div className='flex flex-col'>
                        <h1 className='text-teal-600 text-[60px]'>EduSync</h1>
                        <p className='text-[20px]'>Browse our <a href='/pricing' className='text-teal-600 hover:text-teal-700 hover:underline'>pricing</a> plans</p>
                    </div>
                </div>
            </div>
            <div className='w-1/2 px-[50px] py-[30px] min-h-screen bg-white'>
                <GoBackButton />
                <div className='my-[20px] px-[30px] py-[20px] bg-gray-100'>
                    <span>Already have an account? <a href="/signin" className='text-teal-600 hover:text-teal-700 hover:underline'>Sign In</a></span>
                </div>
                <form ref={formRef} className='w-full my-[30px]'>

                    <div className='text-[20px]'>{step === 1 ? 'Account Details' : step === 2 ? 'Personal Details' : 'Set Password'}</div>

                    <div className={step != 1 ? 'hidden' : ''}>
                        <div className='my-[20px] flex flex-row'>
                            <div>
                                <label htmlFor="fname"><RequiredIndicator />First Name:</label><br />
                                <input
                                    type="text"
                                    id="fname"
                                    name="fname"
                                    className={`border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-md w-full ${errors.fname ? 'border-red-500' : 'border-gray-200'} ${locked1 && 'text-gray-400 cursor-default'} `}
                                    onChange={fnameValidate}
                                    readOnly={locked1}
                                />
                                {errors.fname && <p className="text-red-500 text-sm">{errors.fname}</p>}
                            </div>
                            <div className='mx-[20px]'>
                                <label htmlFor="mname">Middle Name:</label><br />
                                <input
                                    type="text"
                                    id="mname"
                                    name="mname"
                                    className={`border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-md w-full ${locked1 && 'text-gray-400 cursor-default'}`}
                                    readOnly={locked1}
                                />
                            </div>
                            <div>
                                <label htmlFor="lname"><RequiredIndicator />Last Name:</label><br />
                                <input
                                    type="text"
                                    id="lname"
                                    name="lname"
                                    className={`border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-md w-full ${errors.lname ? 'border-red-500' : 'border-gray-200'} ${locked1 && 'text-gray-400 cursor-default'}`}
                                    onChange={lnameValidate}
                                    readOnly={locked1}
                                />
                                {errors.lname && <p className="text-red-500 text-sm">{errors.lname}</p>}
                            </div>
                        </div>
                        <div className='my-[20px]'>
                            <label htmlFor="email"><RequiredIndicator />Email:</label><br />
                            <input
                                ref={emailRef}
                                type="email"
                                id="email"
                                name="email"
                                className={`border-[1px] outline-none px-[10px] py-[5px] rounded-md w-full ${errors.email ? 'border-red-500' : 'border-gray-200'} ${locked1 && 'text-gray-400 cursor-default'}`}
                                onChange={emailValidate}
                                readOnly={locked1}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                    </div>

                    <div className={step != 2 ? 'hidden' : ''}>
                        <div className='my-[20px]'>
                            <label htmlFor="contact"><RequiredIndicator />Contact Number:</label><br />
                            <input
                                type="text"
                                id="contact"
                                name="contact"
                                className={`border-[1px] outline-none px-[10px] py-[5px] rounded-md w-full ${errors.contact ? 'border-red-500' : 'border-gray-200'} ${locked2 && 'text-gray-400 cursor-default'}`}
                                onChange={contactValidate}
                                readOnly={locked2}
                            />
                            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
                        </div>
                        <div className='my-[20px]'>
                            <label htmlFor="address"><RequiredIndicator />Address:</label><br />
                            <textarea
                                id="address"
                                name="address"
                                className={`border-[1px] outline-none px-[10px] py-[5px] rounded-md w-full ${errors.address ? 'border-red-500' : 'border-gray-200'} ${locked2 && 'text-gray-400 cursor-default'}`}
                                onChange={addressValidate}
                                readOnly={locked2}
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                        </div>
                    </div>

                    <div className={step != 3 ? 'hidden' : ''}>
                        <div className='flex flex-row mt-[20px]'>
                            <div className='flex flex-col w-full whitespace-nowrap'>
                                <div className='mb-[20px]'>
                                    <label htmlFor="password"><RequiredIndicator />Password:</label><br />
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className={`border-[1px] outline-none px-[10px] py-[5px] rounded-md w-full ${errors.password ? 'border-red-500' : 'border-gray-200'} ${(locked3 || passVals.rpassword) && 'text-gray-400 cursor-default'}`}
                                        onChange={passwordValidate}
                                        readOnly={locked3 || passVals.rpassword}
                                    />
                                    {errors.password && <p className="text-red-500 text-sm whitespace-normal">{errors.password}</p>}
                                </div>
                                <div className='my-[20px]'>
                                    <label htmlFor="rpassword"><RequiredIndicator />Retype Password:</label><br />
                                    <input
                                        type="password"
                                        id="rpassword"
                                        name="rpassword"
                                        className={`border-[1px] outline-none px-[10px] py-[5px] rounded-md w-full ${errors.rpassword ? 'border-red-500' : 'border-gray-200'} ${(locked3 || !passVals.password) && 'text-gray-400 cursor-default'}`}
                                        onChange={retypePasswordValidate}
                                        readOnly={locked3 || !passVals.password}
                                    />
                                    {errors.rpassword && <p className="text-red-500 text-sm">{errors.rpassword}</p>}
                                </div>
                            </div>
                            <div className='ml-[20px] text-[15px] bg-gray-50 w-fit whitespace-nowrap p-[10px] border-[1px]'>
                                <p>
                                    <span className={minimumChars ? 'text-green-600' : 'text-red-500'}>Minimum eight characters</span><br />
                                    <span className={uppercaseCheck ? 'text-green-600' : 'text-red-500'}>At least one uppercase letter</span><br />
                                    <span className={lowercaseCheck ? 'text-green-600' : 'text-red-500'}>At least one lowercase letter</span><br />
                                    <span className={digitCheck ? 'text-green-600' : 'text-red-500'}>At least one number</span><br />
                                    <span className={specialCharCheck ? 'text-green-600' : 'text-red-500'}>At least one special character<br />(@, $, !, %, ?, &)</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='my-[20px]'>
                        <InputButton
                            inpType='submit'
                            inpVal={step == 3 ? 'Submit' : 'Next'}
                            bg='bg-teal-600'
                            hbg='hover:bg-teal-700'
                            handleClick={validateAndProceed}
                        />
                    </div>

                </form>

            </div >
        </div >
    )
}

export default UserRegistration
