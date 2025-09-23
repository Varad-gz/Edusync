import React from 'react';

export const BounceESLoading = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black">
            <div className="text-[150px] font-bold text-teal-600">
                <span className="inline-block animate-bounce select-none">E</span>
                <span className="inline-block animate-bounce select-none">S</span>
            </div>
        </div>
    );
};