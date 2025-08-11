import { Copyright } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <footer className="w-screen bg-black text-white h-fit flex flex-col gap-4 font-playfair-display px-8 py-6">
            <div className="flex flex-wrap items-start justify-between gap-6 w-full">
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <span className="text-lg text-center font-bold">
                        About Planova
                    </span>
                    <span className="text-sm">
                        Planova is an AI-powered travel planner that turns a single wish into a fully optimized, personalized itinerary.
                        Combining tailored AI recommendations with Foursquare’s robust location data, it curates trips that align with your
                        interests, time, and budget.
                    </span>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <span className="text-lg text-center font-bold">
                        How It Works
                    </span>
                    <span className="text-sm">
                        We capture your preferences, discover and rank the best venues, and optimize routes using Google Maps data.
                        With features like weather-aware planning, dietary filters, and one-tap re-shuffling, your trip stays efficient and enjoyable.
                    </span>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <span className="text-lg text-center font-bold">
                        Tech & Vision
                    </span>
                    <span className="text-sm">
                        Built with Next.js, AI models, and Foursquare API, Planova is designed for speed, accuracy, and flexibility.
                        Future updates will bring crowd forecasting, sustainability metrics, and deeper local-guide integration.
                    </span>
                </div>
            </div>

            <div className="flex gap-2 text-center justify-center items-center mt-4">
                <Copyright className="h-4 w-4" />
                <span className="text-[0.7em] font-light">
                    Planova - Smart Travel Guide | All rights reserved
                </span>
            </div>
        </footer>
    )
}

export default Footer
