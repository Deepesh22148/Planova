import React from 'react'
import Topbar from "@/components/layout/Topbar";
import Footer from "@/components/layout/Footer";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-400/30 overflow-x-hidden flex flex-col">
            <Topbar />

            <main className="flex-grow">
                {children}
            </main>

            <Footer />
        </div>
    )
}

export default DashboardLayout
