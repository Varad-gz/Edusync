'use client'
import { BounceESLoading } from '@/components/Loading';
import RequiredIndicator from '@/components/RequiredIndicator';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const ManageUsers = () => {
    const { data: session, status } = useSession({
        fetchUser: false,
    });

    const [userData, setUserData] = useState([])

    if (status === 'loading') {
        return <BounceESLoading />
    }

    const getTypeData = async (e) => {
        if (e.target.value != '') {
            const api = `/api/${session.user.role}/fetchall-${e.target.value}`
            try {
                const response = await fetch(api, {
                    method: 'GET'
                })

                const data = await response.json()

                if (data.data) {
                    setUserData(data.data);
                } else {
                    toast.error(data.error, {
                        autoClose: 2000,
                    })
                }

            } catch (err) {
                toast.error(err.message);
            }
        } else {
            setUserData([])
        }
    }

    return (
        <div className='p-[30px] w-full flex flex-col bg-gradient-to-l from-gray-950 to-zinc-950 text-white'>
            <div>
                <h1 className='text-[20px] mb-[20px]'>Manage Users</h1>
            </div>
            <div className='mb-[20px] flex flex-col'>
                <label htmlFor="userType" className='mb-[10px]'><RequiredIndicator />User Type</label>
                <select defaultValue='' className='w-fit whitespace-nowrap bg-zinc-900 rounded-md outline-none px-[10px] py-[5px]' onChange={(e) => getTypeData(e)}>
                    <option value=''>Select User Type</option>
                    <option value='student'>Students</option>
                    <option value='instructor'>Instructors</option>
                </select>
            </div>
            <div className='my-[10px]'>
                {userData.length > 0 ? (
                    userData.map((user, index) => (
                        <div key={index}>
                            <p>ID: {user.id}</p>
                            <p>Name: {user.firstName} {user.middleName} {user.lastName}</p>
                            <p>Address: {user.address}</p>
                            <p>Contact: {user.contact}</p>
                            <p>Email: {user.email}</p>
                            <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
                            <p>Updated At: {new Date(user.updatedAt).toLocaleString()}</p>
                            <p>Admin ID: {user.adminId}</p>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    )
}

export default ManageUsers
