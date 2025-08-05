"use client"

import {useRouter} from "next/navigation";
import React from "react";

const Home = () => {

  const router = useRouter();

  React.useEffect(() => {
    router.push("/auth/sign-in")
  })


  return (
    <div>
      default page
    </div>
      );
}

export default Home;
