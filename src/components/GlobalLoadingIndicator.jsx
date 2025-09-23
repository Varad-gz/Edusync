"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BounceESLoading } from "./Loading";

const GlobalLoadingIndicator = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleComplete = () => setLoading(false);

        router.events?.on("routeChangeStart", handleStart);
        router.events?.on("routeChangeComplete", handleComplete);
        router.events?.on("routeChangeError", handleComplete);

    }, [router]);

    if (!loading) return null;

    return <BounceESLoading />
};

export default GlobalLoadingIndicator;
