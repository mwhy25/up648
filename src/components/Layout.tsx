import { type ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Link } from "react-router-dom";

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                {/* Logo */}
                                <Link to="/" className="flex items-center">
                                    <span className="text-2xl font-bold text-orange-600">UP648</span>
                                </Link>
                            </div>
                            {/* Navigation */}
                            <div className="hidden md:block">
                                <Navigation />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation */}
            <div className="border-b bg-white md:hidden">
                <div className="w-full px-2 sm:px-4 lg:px-6">
                    <Navigation />
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow px-2 py-4 sm:px-4 lg:px-6">
                <div className="w-full h-full">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t bg-white">
                <div className="w-full px-2 py-4 sm:px-4 lg:px-6">
                    <p className="text-center text-sm text-gray-500">
                        UP648 - Unified Platform Geospatial Agile Board by PS6 PRO MAX
                    </p>
                </div>
            </footer>
        </div>
    );
}