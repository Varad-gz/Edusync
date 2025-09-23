'use client'
import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from "yup";
import { toast } from 'react-toastify';
import deepEqual from '@/utils/deepEqual';

const ProfileForm = ({ session, data, postapi }) => {

    const initialValues = {
        fname: session?.user?.name || "",
        mname: data?.middleName || "",
        lname: data?.lastName || "",
        email: session?.user?.email || "",
        contact: data?.contact || "",
        address: data?.address || "",
    };

    const validationSchema = Yup.object().shape({
        fname: Yup.string().required("First Name is required"),
        mname: Yup.string(),
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
        if (postapi) {
            if (!deepEqual(initialValues, values)) {
                values['sessionemail'] = session.user.email;
                try {
                    const response = await fetch(postapi, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(values)
                    })

                    const data = await response.json()

                    if (data.message) {
                        toast.success(data.message, {
                            autoClose: 3000,
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
                toast.info('No changes were made.')
            }
        }
    };

    return (
        <div className='p-[30px] w-full flex flex-col bg-zinc-950 text-white'>
            <div>
                <h1 className='text-[20px]'>{postapi ? 'Manage' : 'View'} Profile</h1>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ touched, errors }) => (
                    <Form className="w-1/2 my-[30px]">
                        <div className="my-[20px] flex flex-row">
                            <div>
                                <label htmlFor="fname">First Name</label>
                                <Field
                                    id="fname"
                                    name="fname"
                                    className={`${errors.fname && touched.fname ? 'border-[1px]  border-red-500' : ''} bg-zinc-900 rounded-md outline-none ${postapi ? 'focus:border-[1px] focus:border-teal-800' : 'cursor-default'} px-[10px] py-[5px] w-full`}
                                    readOnly={!postapi}
                                />
                                <ErrorMessage
                                    name="fname"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                            <div className="mx-[20px]">
                                <label htmlFor="mname">Middle Name</label>
                                <Field
                                    id="mname"
                                    name="mname"
                                    className={`bg-zinc-900 outline-none ${postapi ? 'focus:border-[1px] focus:border-teal-800' : 'cursor-default'} px-[10px] py-[5px] rounded-md w-full`}
                                    readOnly={!postapi}
                                />
                            </div>
                            <div>
                                <label htmlFor="lname">Last Name</label>
                                <Field
                                    id="lname"
                                    name="lname"
                                    className={`${errors.lname && touched.lname ? 'border-[1px]  border-red-500' : ''} bg-zinc-900 outline-none ${postapi ? 'focus:border-[1px] focus:border-teal-800' : 'cursor-default'} px-[10px] py-[5px] rounded-md w-full`}
                                    readOnly={!postapi}
                                />
                                <ErrorMessage
                                    name="lname"
                                    component="div"
                                    className="text-red-500 text-sm"
                                    readOnly={!postapi}
                                />
                            </div>
                        </div>

                        <div className="my-[20px]">
                            {
                                session?.user?.method === "local" || !postapi ?
                                    (
                                        <>
                                            <label htmlFor="email">Email</label>
                                            <Field
                                                id="email"
                                                name="email"
                                                type="email"
                                                className={`${errors.email && touched.email ? 'border-[1px]  border-red-500' : ''} bg-zinc-900 outline-none ${postapi ? 'focus:border-[1px] focus:border-teal-800' : 'cursor-default'} px-[10px] py-[5px] rounded-md w-full`}
                                                readOnly={!postapi}
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <div className="font-medium">Google Login:</div>
                                            <input type='hidden' name='email' value={session.user.email}></input>
                                            <div>{session.user.email}</div>
                                        </>
                                    )
                            }
                        </div>

                        <div className="my-[20px]">
                            <label htmlFor="contact">Contact Number</label>
                            <Field
                                id="contact"
                                name="contact"
                                className={`${errors.contact && touched.contact ? 'border-[1px]  border-red-500' : ''} bg-zinc-900 outline-none ${postapi ? 'focus:border-[1px] focus:border-teal-800' : 'cursor-default'} px-[10px] py-[5px] rounded-md w-full`}
                                readOnly={!postapi}
                            />
                            <ErrorMessage
                                name="contact"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div className="my-[20px]">
                            <label htmlFor="address">Address</label>
                            <Field
                                as="textarea"
                                id="address"
                                name="address"
                                className={`${errors.address && touched.address ? 'border-[1px]  border-red-500' : ''} bg-zinc-900 outline-none ${postapi ? 'focus:border-[1px] focus:border-teal-800' : 'cursor-default'}  px-[10px] py-[5px] rounded-md w-full`}
                                readOnly={!postapi}
                            />
                            <ErrorMessage
                                name="address"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        {
                            postapi ?
                                <div className="my-[20px]">
                                    <button
                                        type="submit"
                                        className="bg-teal-600 hover:bg-teal-700 text-white py-[10px] px-[20px] rounded-md"
                                    >
                                        Save
                                    </button>
                                </div> :
                                <></>
                        }
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default ProfileForm
