import Link from "next/link"
import React from "react"
import { HiUserAdd } from "react-icons/hi";
import { FaUserEdit } from "react-icons/fa";
import { FaObjectGroup } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa";

const DashboardHome = () => {
    return (
        <div className="p-[30px] flex flex-col w-full bg-zinc-950 text-white">
            <div>
                <h1 className='text-[20px]'>Main Dashboard</h1>
            </div>
            <div className="flex w-full mt-[40px] text-black">
                <Link href='/dashboard/create-user'>
                    <div className="h-[200px] w-[200px] flex flex-col items-center justify-center bg-teal-500 hover:bg-teal-600 rounded-md mx-[10px] transition ease-in-out delay-50">
                        <HiUserAdd className="text-[50px]" />
                        <div className="text-[18px] whitespace-nowrap">Create User</div>
                    </div>
                </Link>
                <Link href='/dashboard/manage-users'>
                    <div className="h-[200px] w-[200px] flex flex-col items-center justify-center bg-teal-500 hover:bg-teal-600 rounded-md mx-[10px] transition ease-in-out delay-50">
                        <FaUserEdit className="text-[50px]" />
                        <div className="text-[18px] whitespace-nowrap">Manage Users</div>
                    </div>
                </Link>
                <Link href='/dashboard/create-program'>
                    <div className="h-[200px] w-[200px] flex flex-col items-center justify-center bg-teal-500 hover:bg-teal-600 rounded-md mx-[10px] transition ease-in-out delay-50">
                        <FaObjectGroup className="text-[50px]" />
                        <div className="text-[18px] whitespace-nowrap">Create Program</div>
                    </div>
                </Link>
                <Link href='/dashboard/manage-programs'>
                    <div className="h-[200px] w-[200px] flex flex-col items-center justify-center bg-teal-500 hover:bg-teal-600 rounded-md mx-[10px] transition ease-in-out delay-50">
                        <FaLayerGroup className="text-[50px]" />
                        <div className="text-[18px] whitespace-nowrap">Manage Programs</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default DashboardHome
