"use client";

import Lottie from "lottie-react";
import loaderAnimation from "@/components/signup.json";

export default function Loader() {
    return <Lottie animationData={loaderAnimation} />;
}
