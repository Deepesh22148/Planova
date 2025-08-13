import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Mail, Phone, MapPin, Heart, Lightbulb, Zap } from "lucide-react";
import Image from "next/image"

const About = () => {
    return (
        <DashboardLayout>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary to-accent overflow-hidden">
                <div className="absolute inset-0 bg-primary/90"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <Badge className="bg-accent-soft text-accent border-accent/20">
                                    About Planova
                                </Badge>
                                <h1 className="text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                                    Building the Future of
                                    <span className="text-accent"> Planning</span>
                                </h1>
                                <p className="text-xl text-primary-foreground/90 leading-relaxed">
                                    We&apos;re passionate about creating tools that empower teams and individuals
                                    to plan better, collaborate seamlessly, and achieve their goals with confidence.
                                </p>
                            </div>
                        </div>
                        <div className="lg:block">
                            <Image
                                src="/about-hero.jpg"
                                alt="Team collaboration and planning"
                                className="w-full h-auto rounded-2xl shadow-2xl border border-primary-foreground/10"
                                height={400}
                                width={400}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Vision Section */}
            <section className="py-24 bg-section-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 mb-6">
                            <Target className="w-6 h-6 text-accent" />
                            <Badge variant="secondary">Our Vision</Badge>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                            Revolutionizing How Teams Plan
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            We envision a world where planning is intuitive, collaboration is effortless,
                            and every team has the tools they need to turn ideas into reality.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="p-8 text-center border-0 bg-feature-bg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-soft rounded-full mb-6">
                                <Lightbulb className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-4">Innovation First</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                We constantly push boundaries to bring you cutting-edge planning tools
                                that adapt to your unique workflow and needs.
                            </p>
                        </Card>

                        <Card className="p-8 text-center border-0 bg-feature-bg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-soft rounded-full mb-6">
                                <Users className="w-8 h-8 text-accent" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-4">Team-Centric</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Every feature is designed with collaboration in mind, making it easy for
                                teams of all sizes to work together effectively.
                            </p>
                        </Card>

                        <Card className="p-8 text-center border-0 bg-feature-bg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-6">
                                <Zap className="w-8 h-8 text-success" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-4">Efficiency Focused</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                We believe in simplicity and speed, creating tools that enhance productivity
                                without adding complexity to your workflow.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Meet The Devs Section */}
            <section className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2">
                                    <Heart className="w-6 h-6 text-accent" />
                                    <Badge variant="secondary">Meet The Devs</Badge>
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                                    The Minds Behind Planova
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    We&apos;re a passionate team of developers, designers, and product enthusiasts
                                    who believe that great software starts with understanding real user needs.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-primary-soft rounded-lg">
                                        <div className="text-3xl font-bold text-primary">50+</div>
                                        <div className="text-sm text-text-subtle">Projects Delivered</div>
                                    </div>
                                    <div className="text-center p-4 bg-accent-soft rounded-lg">
                                        <div className="text-3xl font-bold text-accent">24/7</div>
                                        <div className="text-sm text-text-subtle">Support Available</div>
                                    </div>
                                </div>

                                <p className="text-muted-foreground leading-relaxed">
                                    Our diverse team brings together expertise from various backgrounds -
                                    from enterprise software development to startup innovation. We&apos;re united
                                    by our commitment to creating tools that make planning and collaboration
                                    effortless for teams worldwide.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <Image
                                src="/dev-team.jpg"
                                alt="Development team working together"
                                className="w-full h-auto rounded-2xl shadow-2xl"
                                height={100}
                                width={100}
                            />
                            <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-lg border">
                                <div className="text-2xl font-bold text-primary">5+</div>
                                <div className="text-sm text-muted-foreground">Years Experience</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="py-24 bg-section-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 mb-6">
                            <Mail className="w-6 h-6 text-accent" />
                            <Badge variant="secondary">Contact Us</Badge>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                            Let&apos;s Start a Conversation
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Have questions, feedback, or ideas? We&apos;d love to hear from you.
                            Our team is always ready to help and excited to connect.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="grid gap-6">
                                <Card className="p-6 border-0 bg-feature-bg shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-soft rounded-lg">
                                            <Mail className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">Email Us</h3>
                                            <p className="text-muted-foreground mb-3">
                                                Send us a message and we&apos;ll respond within 24 hours.
                                            </p>
                                            <a href="mailto:hello@planova.com" className="text-primary hover:text-primary/80 font-medium">
                                                hello@planova.com
                                            </a>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6 border-0 bg-feature-bg shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-soft rounded-lg">
                                            <Phone className="w-6 h-6 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">Call Us</h3>
                                            <p className="text-muted-foreground mb-3">
                                                Available Monday to Friday, 9 AM to 6 PM EST.
                                            </p>
                                            <a href="tel:+1234567890" className="text-accent hover:text-accent/80 font-medium">
                                                +1 (234) 567-8900
                                            </a>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6 border-0 bg-feature-bg shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg">
                                            <MapPin className="w-6 h-6 text-success" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">Visit Us</h3>
                                            <p className="text-muted-foreground mb-3">
                                                Come say hello at our office in the heart of the city.
                                            </p>
                                            <p className="text-success font-medium">
                                                123 Innovation Drive<br />
                                                Tech Hub, CA 94105
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        <div className="text-center">
                            <Image
                                src="/contact-illustration.jpg"
                                alt="Contact and communication"
                                className="w-full max-w-md mx-auto h-auto"
                                height={100}
                                width={100}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </DashboardLayout>
    );
};

export default About;
