import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {Brain, Code, MapPin, Route, Smartphone, Sparkles, Zap} from "lucide-react";

const ServicePage = () => {

    const services = [
        {
            icon: <MapPin className="w-8 h-8 text-primary" />,
            title: "Personalized Travel Planning",
            description: "AI-powered itineraries tailored to your unique preferences",
            features: [
                "Custom itineraries based on city, dates, interests, and constraints",
                "Hidden gems and local favorites discovery",
                "Efficient route planning for maximum enjoyment"
            ],
            badge: "Core Service"
        },
        {
            icon: <Brain className="w-8 h-8 text-primary" />,
            title: "Smart Recommendations",
            description: "Intelligent venue discovery with advanced filtering",
            features: [
                "Venue discovery with Foursquare Places API",
                "Semantic fallback with AI search when data is missing",
                "Advanced filters: crowd levels, dietary preferences, price tiers, weather risks"
            ],
            badge: "AI-Powered"
        },
        {
            icon: <Route className="w-8 h-8 text-primary" />,
            title: "Optimized Itineraries",
            description: "Perfect scheduling with smart route optimization",
            features: [
                "Hour-by-hour schedule planning",
                "Route optimization using Google Directions",
                "Walking time and opening hours considered",
                "Greedy TSP approach for maximum efficiency"
            ],
            badge: "Algorithm"
        },
        {
            icon: <Smartphone className="w-8 h-8 text-primary" />,
            title: "Interactive Experience",
            description: "Dynamic and engaging travel planning interface",
            features: [
                "Dynamic timeline of activities",
                "Interactive maps (Google Maps/Mapbox)",
                "Real-time cost estimates for trips",
                "One-tap 'reshuffle' option for instant replanning"
            ],
            badge: "User Experience"
        },
        {
            icon: <Zap className="w-8 h-8 text-primary" />,
            title: "Reliability & Performance",
            description: "Fast, reliable service with continuous improvement",
            features: [
                "Redis caching for lightning-fast lookups",
                "Comprehensive observability and logging",
                "API usage and latency tracking",
                "Continuous improvement based on user data"
            ],
            badge: "Performance"
        },
        {
            icon: <Code className="w-8 h-8 text-primary" />,
            title: "Tech-Backed Innovation",
            description: "Cutting-edge technology stack powering your journey",
            features: [
                "Powered by GPT & Gemini for natural language understanding",
                "Next.js frontend with scalable backend architecture",
                "Modern DevOps pipeline for reliability",
                "Secure and responsive infrastructure"
            ],
            badge: "Technology"
        }
    ];

    return (
        <DashboardLayout>
            <section className="py-20 px-6 bg-background font-playfair-display bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                            Our Travel Services
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Comprehensive AI-powered travel planning with cutting-edge technology
                            to create your perfect journey
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <Card
                                key={index}
                                className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-border/30 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
                            >
                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 shadow-sm">
                                            {service.icon}
                                        </div>
                                        <Badge variant="outline" className="text-xs border-primary text-primary bg-primary/5">
                                            {service.badge}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-xl font-semibold text-foreground">
                                        {service.title}
                                    </CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        {service.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <ul className="space-y-3">
                                        {service.features.map((feature, featureIndex) => (
                                            <li
                                                key={featureIndex}
                                                className="flex items-start text-sm text-muted-foreground"
                                            >
                                                <div className="mt-1.5 mr-3 flex-shrink-0">
                                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-primary/70 animate-pulse"></div>
                                                </div>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <p className="text-lg text-muted-foreground">
                            Ready to experience the future of travel planning?
                        </p>
                    </div>
                </div>
            </section>
        </DashboardLayout>
    )
}

export default ServicePage
