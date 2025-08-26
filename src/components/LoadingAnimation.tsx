"use client";

import Lottie from "lottie-react";
import loaderAnimation from "@/components/LoadingAnimation.json";

export default function Loader() {
  return (
    <div className="w-64 h-64"> {/* adjust to your preferred size */}
      <Lottie animationData={loaderAnimation} loop autoplay />
    </div>
  );
}