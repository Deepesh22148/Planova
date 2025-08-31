"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Eye, EyeOff, Key, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import DashboardLayout from "@/components/layout/DashboardLayout";
import dynamic from "next/dynamic";
import { signinSchema } from "@/schemas/signinSchema";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInAnimation = dynamic(() => import("@/components/SignInAnimation"), {
  ssr: false,
});

const LoadingAnimation = dynamic(
  () => import("@/components/LoadingAnimation"),
  {
    ssr: false,
  }
);

const SignInPage = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const router = useRouter();
  const { data: session, status } = useSession() ?? "";
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (
    data: z.infer<typeof signinSchema>,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/sign-in", data);
      console.log(response);
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });
      setLoading(false);
      if (signInResponse && signInResponse.ok) {
        router.push(signInResponse.url || "/");
      } else if (signInResponse && signInResponse.error) {
        // Optionally show error to user
        console.error("Sign in error:", signInResponse.error);
      }
    } catch (error) {
      console.error("Axios error:", error);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen w-screen flex items-center justify-center bg-white"
        role="status"
        aria-live="polite"
      >
        <div className="flex flex-col items-center gap-4">
          <LoadingAnimation />
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex justify-center gap-3 items-center min-h-screen font-playfair-display bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
        <div className="flex flex-col items-center justify-center gap-4 w-1/2 animate-fadeIn">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 text-center">
            Adventure Awaits
          </h2>
          <p className="text-gray-500 text-center max-w-xs">
            Sign in to explore personalized itineraries and exclusive travel
            deals.
          </p>
          <div className="w-[30em] max-w-full">
            <SignInAnimation />
          </div>
        </div>
        <div className="">
          <Card className="w-full max-w-sm md:min-w-lg shadow-xl">
            <CardHeader>
              <div>
                <div
                  className={
                    "font-playfair-display text-[1.6em] text-center font-lightbold"
                  }
                >
                  Start Your Journey
                </div>
                <div
                  className={
                    "text-muted-foreground text-sm text-center font-inter"
                  }
                >
                  Sign in to access your personalized travel plans
                </div>
              </div>
            </CardHeader>
            <CardContent className={"mt-[-.5em]"}>
              <div className={"flex flex-col gap-4"}>
                <div
                  className={
                    "w-full bg-white text-gray-700 border border-gray-300 " +
                    "hover:bg-gray-50 duration-200 font-medium h-11 rounded-md px-8" +
                    " relative group shadow-md hover:shadow-lg transition-shadow" +
                    " whitespace-nowrap " +
                    "text-sm ring-offset-background focus-visible:outline-none " +
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
                    "disabled:pointer-events-none disabled:opacity-50 rounded-xl p-3 text-center " +
                    "flex justify-center items-center gap-4"
                  }
                >
                  <Image
                    src={"/google-logo.png"}
                    alt={"google-logo"}
                    width={20}
                    height={20}
                  />
                  <div
                    className={
                      "text-muted-foreground font-medium cursor-pointer"
                    }
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                  >
                    Continue with Google
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div
                      data-orientation="horizontal"
                      role="none"
                      className="shrink-0 bg-border h-[2px] w-full"
                    ></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with email
                    </span>
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <label>Email</label>
                    <div className="relative w-full max-w-lg">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...register("email")}
                        className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>Password</label>
                    <div className="relative w-full max-w-lg">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...register("password")}
                        className="pl-10 pr-10 py-2 w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                      />
                      <button
                        type="button"
                        onMouseDown={() => setShowPassword(true)}
                        onMouseUp={() => setShowPassword(false)}
                        onMouseLeave={() => setShowPassword(false)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full p-6 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 text-white hover:opacity-90 transition hover:cursor-pointer"
                  >
                    Start planning your adventure
                  </Button>
                </form>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-center items-center text-sm w-full text-muted-foreground gap-1">
                <span>New to Planova?</span>
                <button
                  type="button"
                  className="text-blue-500 hover:text-blue-700 font-medium cursor-pointer hover:underline focus:outline-none"
                >
                  Create your travel account
                </button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SignInPage;
