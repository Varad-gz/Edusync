'use client'
import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from "yup";
import { toast } from 'react-toastify';
import RequiredIndicator from './RequiredIndicator';

const CreateUserForm = () => {

    const [loading, setLoading] = useState(false)

    const initialValues = {
        userType: "",
        fname: "",
        mname: "",
        lname: "",
        email: "",
        contact: "",
        address: "",
    };

    const validationSchema = Yup.object().shape({
        userType: Yup.string().required("Please select a user type"),
        fname: Yup.string().required("First Name is required"),
        mname: Yup.string().required('Middle Name is required'),
        lname: Yup.string().required("Last Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        contact: Yup.string()
            .matches(/^(?:0|(?:\+91)|91|00)?([6-9]\d{9})$/, "Invalid contact number")
            .required("Contact Number is required"),
        address: Yup.string().required("Address is required"),
    });

    const handleSubmit = async (values) => {
        const api = values.userType === 'student' ? '/api/student/create' : '/api/instructor/create'
        setLoading(true)
        try {
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
                credentials: 'include'
            })

            const data = await response.json()

            setLoading(false)

            if (data.message) {
                toast.success(data.message, {
                    autoClose: 3000,
                    onClose: () => {
                        window.location.reload()
                    }
                })
            } else {
                toast.error(data.error, {
                    autoClose: 2000,
                })
            }

        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <div className='p-[30px] w-full flex flex-col bg-gradient-to-l from-gray-950 to-zinc-950 text-white'>
            <div>
                <h1 className='text-[20px]'>Create User</h1>
            </div>
            <Formik
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                initialValues={initialValues}
            >
                {({ touched, errors }) => (
                    <Form className="w-1/2 my-[30px]">
                        <div className='flex flex-col'>
                            <label htmlFor="userType" className='mb-[10px]'><RequiredIndicator />User Type</label>
                            <Field
                                as="select"
                                id="userType"
                                name="userType"
                                className={`${errors.userType && touched.userType ? 'border-[1px]  border-red-500' : ''} w-fit whitespace-nowrap bg-zinc-900 rounded-md outline-none px-[10px] py-[5px]`}
                            >
                                <option value="" label="Select user type" />
                                <option value="student" label="Student" />
                                <option value="instructor" label="Instructor" />
                            </Field>
                            <ErrorMessage
                                name="userType"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>
                        <div className="my-[20px] flex flex-row">
                            <div>
                                <label htmlFor="fname"><RequiredIndicator />First Name</label>
                                <Field
                                    id="fname"
                                    name="fname"
                                    className={`${errors.fname && touched.fname ? 'border-[1px]  border-red-500' : ''} bg-zinc-900 rounded-md outline-none focus:border-[1px] focus:border-teal-800 px-[10px] py-[5px] w-full`}
                                />
                                <ErrorMessage
                                    name="fname"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                            <div className="mx-[20px]">
                                <label htmlFor="mname"><RequiredIndicator />Middle Name</label>
                                <Field
                                    id="mname"
                                    name="mname"
                                    className={`${errors.mname && touched.mname ? 'border-[1px]  border-red-500' : ''} bg-zinc-900 outline-none focus:border-[1px] focus:border-teal-800 px-[10px] py-[5px] rounded-md w-full`}
                                />
                                <ErrorMessage
                                    name="mname"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="lname"><RequiredIndicator />Last Name</label>
                                <Field
                                    id="lname"
                                    name="lname"
                                    className={`${errors.lname && touched.lname ? 'border-[1px]  border-red-500' : ''} bg-zinc-900 outline-none focus:border-[1px] focus:border-teal-800 px-[10px] py-[5px] rounded-md w-full`}
                                />
                                <ErrorMessage
                                    name="lname"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                        </div>

                        <div className="my-[20px]">
                            <label htmlFor="email"><RequiredIndicator />Email</label>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                className={`${errors.email && touched.email ? 'border-[1px]  border-red-500' : ''} bg-zinc-900 outline-none focus:border-[1px] focus:border-teal-800 px-[10px] py-[5px] rounded-md w-full`}
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div className="my-[20px]">
                            <label htmlFor="contact"><RequiredIndicator />Contact Number</label>
                            <Field
                                id="contact"
                                name="contact"
                                className={`${errors.contact && touched.contact ? 'border-[1px]  border-red-500' : ''} bg-zinc-900 outline-none focus:border-[1px] focus:border-teal-800 px-[10px] py-[5px] rounded-md w-full`}
                            />
                            <ErrorMessage
                                name="contact"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div className="my-[20px]">
                            <label htmlFor="address"><RequiredIndicator />Address</label>
                            <Field
                                as="textarea"
                                id="address"
                                name="address"
                                className={`${errors.address && touched.address ? 'border-[1px]  border-red-500' : ''} bg-zinc-900 outline-none focus:border-[1px] focus:border-teal-800  px-[10px] py-[5px] rounded-md w-full`} />
                            <ErrorMessage
                                name="address"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div className="my-[20px]">
                            <button
                                type="submit"
                                className="bg-teal-600 hover:bg-teal-700 text-white py-[10px] px-[20px] rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CreateUserForm
