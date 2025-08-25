import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import heroImage from "@/../public/assets/background.jpg";
import {Button} from "@/components/ui/button";

const HomePage = () => {
    return (
        <DashboardLayout>
            <section
                className="relative min-h-screen flex items-center justify-center overflow-hidden text-white font-playfair-display"
                style={{
                    backgroundImage: `var(--hero-overlay), url(${heroImage.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        <span className="text-hero-text">Discover Your Perfect</span>
                        <br/>
                        <span
                            className="bg-gradient-to-r from-hero-text text-white to-hero-accent bg-clip-text"
                            style={{
                                background: 'var(--text-gradient)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text'
                            }}
                        >
                        Journey
                      </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-hero-description mb-8 max-w-4xl mx-auto leading-relaxed">
                        Planova turns your travel wishes into a personalized itinerary with
                        AI-powered recommendations, real-time routing and one-tap re-planning.
                    </p>

                    <Button
                        size="lg"
                        className="cursor-pointer bg-blue-700 text-lg px-8 py-6 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-blue-800/70"
                    >
                        Start Planning Your Adventure
                    </Button>
                </div>

                {/* Subtle overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20 z-0"></div>
            </section>
        </DashboardLayout>

    )
}

export default HomePage
