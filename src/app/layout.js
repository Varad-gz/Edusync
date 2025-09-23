import "./globals.css";

import React from "react";
import { ToastContainer } from "react-toastify";

import { Roboto_Mono } from 'next/font/google'
import SessionLayout from "@/components/SessionLayout";
import GlobalLoadingIndicator from "@/components/GlobalLoadingIndicator";

const robotoMono = Roboto_Mono({ subsets: ['latin'] });

export const metadata = {
    title: "EduSync",
    description: "EduSync Educational ERP portal, created with Next.",
};

export default async function RootLayout({ children }) {

    return (
        <html lang="en">
            <body className={`${robotoMono.className} flex flex-col min-h-screen box-border`}>
                <SessionLayout>
                    {children}
                </SessionLayout>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    closeOnClick
                    pauseOnHover
                    newestOnTop
                    toastClassName='bg-gray-800 text-white'
                />
            </body>
        </html >
    );
}
