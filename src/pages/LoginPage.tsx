"use client"
import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import {Compass, Eye, EyeOff, Key, Mail, MapPin, Plane, Route , Map} from 'lucide-react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const LoginPage = () => {


    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    return (
        <div
            className="bg-violet-900/30 min-h-screen flex flex-col gap-2 items-center justify-center overflow-x-hidden">

            <div className={"flex flex-col items-center justify-center mt-[2em] gap-2"}>
                <span className={"flex justify-center items-center gap-2"}>
                    <Image src="/favicon.png" className={"rounded-lg"} alt="logo" width={50} height={50}/>
                    <span className={"font-playfair-display text-4xl font-bold tracking-tight text-foreground mb-2"}>
                        Welcome to Planova
                    </span>
                </span>
                <span className={"font-inter"}>
                    Your AI-powered smart travel guide awaits
                </span>

                <div className={"flex justify-center items-center gap-6 font-extralight text-sm"}>
                    <div className={"flex justify-center items-center gap-2"}>
                        <MapPin className={"h-4 w-4"}/>
                        <span>
                            Discover
                        </span>
                    </div>

                    <div className={"flex justify-center items-center gap-2"}>
                        <Plane className={"h-4 w-4"}/>
                        <span>
                            Plan
                        </span>
                    </div>

                    <div className={"flex justify-center items-center gap-2"}>
                        <Compass className={"h-4 w-4"}/>
                        <span>
                            Explore
                        </span>
                    </div>
                </div>
            </div>

            <div>
                {/* card */}
                <Card className={"w-[20em] md:w-[30em]"}>
                    <CardHeader>
                        <div>
                            <div className={"font-playfair-display text-[1.6em] text-center font-lightbold"}>
                                Start Your Journey
                            </div>
                            <div className={"text-muted-foreground text-sm text-center font-inter"}>
                                Sign in to access your personalized travel plans
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className={"mt-[-.5em]"}>
                        <div className={"flex flex-col gap-4"}>
                            <div
                                className={"w-full bg-white text-gray-700 border border-gray-300 " +
                                    "hover:bg-gray-50 duration-200 font-medium h-11 rounded-md px-8" +
                                    " relative group shadow-md hover:shadow-lg transition-shadow" +
                                    " whitespace-nowrap " +
                                    "text-sm ring-offset-background focus-visible:outline-none " +
                                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
                                    "disabled:pointer-events-none disabled:opacity-50 rounded-xl p-3 text-center " +
                                    "flex justify-center items-center gap-4"}>

                                <Image src={"/google-logo.png"} alt={"google-logo"} width={20} height={20}/>
                                <div className={"text-muted-foreground font-medium"}>
                                    Continue with Google
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div data-orientation="horizontal" role="none"
                                         className="shrink-0 bg-border h-[2px] w-full">
                                    </div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span
                                    className="bg-card px-2 text-muted-foreground">
                                        Or continue with email
                                    </span>
                                </div>
                            </div>
                            <div className={"flex flex-col gap-4"}>


                                <div className={"flex flex-col gap-3"}>
                                    <div className={"flex flex-col gap-2"}>
                                        <label className={"font-playfair-display font-light"}>
                                            Email
                                        </label>

                                        <div className="relative w-full max-w-sm">
                                            {/* Icon */}
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />

                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                            />
                                        </div>

                                    </div>

                                    <div className={"flex flex-col gap-2"}>
                                        <label className={"font-playfair-display font-light"}>
                                            Password
                                        </label>
                                        <div className="relative w-full max-w-sm">
                                            {/* Icon on Left */}
                                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />

                                            {/* Input */}
                                            <Input
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
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>




                                <div className={"w-full text-right text-muted-foreground text-xs font-inter hover:underline hover:text-black hover:cursor-pointer"}>
                                    Forgot Password?
                                </div>

                                <div className={"w-full"}>
                                    <Button className="w-full p-6 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 text-white hover:opacity-90 transition hover:cursor-pointer">
                                        Start planning your adventure
                                    </Button>
                                </div>
                            </div>
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

            <div className="flex flex-col gap-4 w-[35em] bg-white text-sm text-muted-foreground p-4 rounded-xl shadow-2xl">
                {/* Title */}
                <div className="w-full text-center font-semibold text-gray-800">
                    What you'll get with Planova
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-6 justify-center items-center text-gray-600">
                    <div className="flex flex-col items-center gap-1">
                        <Compass size={20} className="text-blue-500" />
                        <span>AI-powered itineraries</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <Map className="text-green-500" />
                        <span>Local recommendations</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <Route className="text-purple-500" />
                        <span>Smart routing</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
