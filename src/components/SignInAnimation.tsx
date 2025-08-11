"use client";

import Lottie from "lottie-react";
import loaderAnimation from "@/components/signin.json";

export default function Loader() {
    return <Lottie animationData={loaderAnimation} />;
}
