import React from 'react'

const WorkUnderProgress = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-230px)] bg-gray-100 text-gray-700">
            <div className="text-center">
                <h1 className="text-2xl font-semibold mt-4">Work In Progress</h1>
                <p className="mt-2 text-gray-600">
                    This page is currently being worked upon, please come back later!
                </p>
            </div>
        </div>
    )
}

export default WorkUnderProgress
