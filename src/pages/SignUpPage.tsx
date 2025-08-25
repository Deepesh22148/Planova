"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Eye, EyeOff, Key, Locate, Mail, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schemas/signupSchema";
import { z } from "zod";

import dynamic from "next/dynamic";
import axios from "axios";

const SignUpAnimation = dynamic(() => import("@/components/SignUpAnimation"), {
  ssr: false,
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState<boolean>(false);
  const [phone, setPhone] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  const filterPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = e?.target?.value?.replace(/[^0-9+\-\s]/g, "");
    setPhone(filtered);
  };

  const onSubmit = async (data: z.infer<typeof signupSchema> ,e?: React.BaseSyntheticEvent) => {
     e?.preventDefault();
    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
    } catch (error) {
      console.error("Axios error:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-row-reverse justify-center gap-3 items-center min-h-screen font-playfair-display bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-4">
        <div className="flex flex-col items-center justify-center gap-4 w-1/2 animate-fadeIn">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 text-center">
            Your Next Chapter Starts Here
          </h2>
          <p className="text-gray-500 text-center max-w-md">
            Unlock insider tips and handpicked recommendations—just for you
          </p>
          <div className="w-[30em] max-w-full">
            <SignUpAnimation />
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
                  Plan , Pack. Go
                </div>
                <div
                  className={
                    "text-muted-foreground text-sm text-center font-inter"
                  }
                >
                  Sign up to explore destinations that match your style.
                </div>
              </div>
            </CardHeader>
            <CardContent className={"mt-[-.5em]"}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className={"flex flex-col gap-4"}>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div
                        data-orientation="horizontal"
                        role="none"
                        className="shrink-0 bg-border h-[2px] w-full"
                      ></div>
                    </div>
                  </div>
                  <div className={"flex flex-col gap-6"}>
                    <div className={"flex flex-col gap-3"}>
                      <div className={"flex flex-col gap-2"}>
                        <label className={"font-playfair-display font-light"}>
                          Name
                        </label>

                        <div className="relative w-full max-w-lg">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                          <Input
                            {...register("fullname")}
                            type="text"
                            placeholder="Enter your name"
                            className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                          />
                        </div>
                        {errors.fullname && (
                          <p className="text-red-500 text-sm">
                            {errors.fullname.message}
                          </p>
                        )}
                      </div>

                      <div className={"flex flex-col gap-2"}>
                        <label className={"font-playfair-display font-light"}>
                          Username
                        </label>

                        <div className="relative w-full max-w-lg">
                          {/* Icon */}
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                          <Input
                            {...register("username")}
                            type="text"
                            placeholder="Enter your username"
                            className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                          />
                        </div>
                        {errors.username && (
                          <p className="text-red-500 text-sm">
                            {errors.username.message}
                          </p>
                        )}
                      </div>

                      <div className={"flex flex-col gap-2"}>
                        <label className={"font-playfair-display font-light"}>
                          Address
                        </label>

                        <div className="relative w-full max-w-lg">
                          {/* Icon */}
                          <Locate className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                          <Input
                            {...register("address")}
                            type="text"
                            placeholder="Enter your address"
                            className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                          />
                        </div>

                        {errors.address && (
                          <p className="text-red-500 text-sm">
                            {errors.address.message}
                          </p>
                        )}
                      </div>

                      <div className={"flex flex-col gap-2"}>
                        <label className={"font-playfair-display font-light"}>
                          Email
                        </label>

                        <div className="relative w-full max-w-lg">
                          {/* Icon */}
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                          <Input
                            {...register("email")}
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-sm">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className={"flex flex-col gap-2"}>
                        <label className={"font-playfair-display font-light"}>
                          Phone
                        </label>

                        <div className="relative w-full max-w-lg">
                          {/* Icon */}
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                          <Input
                            {...register("phone")}
                            type="tel"
                            placeholder="Enter your phone"
                            pattern="^\+?[0-9\s\-]{7,15}$"
                            onInput={filterPhone}
                            title="Enter a valid phone number"
                            className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-sm">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div className={"flex flex-col gap-2"}>
                        <label className={"font-playfair-display font-light"}>
                          Password
                        </label>
                        <div className="relative w-full max-w-lg">
                          {/* Icon on Left */}
                          <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />

                          {/* Input */}
                          <Input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10 py-2 w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                          />

                          {/* Show/Hide Button */}
                          <button
                            type="button"
                            onMouseDown={() => setShowPassword(true)}
                            onMouseUp={() => setShowPassword(false)}
                            onMouseLeave={() => setShowPassword(false)}
                            onTouchStart={() => setShowPassword(true)}
                            onTouchEnd={() => setShowPassword(false)}
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
                          <p className="text-red-500 text-sm">
                            {errors.password.message}
                          </p>
                        )}
                      </div>

                      <div className={"flex flex-col gap-2"}>
                        <label className={"font-playfair-display font-light"}>
                          Confirm Password
                        </label>
                        <div className="relative w-full max-w-lg">
                          {/* Icon on Left */}
                          <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />

                          {/* Input */}
                          <Input
                            {...register("confirmPassword")}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Enter your password again"
                            className="pl-10 pr-10 py-2 w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                          />

                          {/* Show/Hide Button */}
                          <button
                            type="button"
                            onMouseDown={() => setShowConfirmPassword(true)}
                            onMouseUp={() => setShowConfirmPassword(false)}
                            onMouseLeave={() => setShowConfirmPassword(false)}
                            onTouchStart={() => setShowConfirmPassword(true)}
                            onTouchEnd={() => setShowConfirmPassword(false)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className={"w-full"}>
                      <Button className="w-full p-6 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 text-white hover:opacity-90 transition hover:cursor-pointer">
                        Start planning your adventure
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className={"p-0"} />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SignUpPage;
