import React, { useState, useEffect } from 'react';
import './LandingPage.css';

const LandingPage = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX / window.innerWidth - 0.5, // Normalize mouse position
                y: e.clientY / window.innerHeight - 0.5,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="landing-page">
            {/* Hero Section with Mouse Interaction */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">Create. Manage. Grow.</h1>
                    <p className="hero-subtitle">Your invoices, simplified and automated.</p>
                    <button className="cta-btn">Start Now</button>
                </div>
            </section>

            {/* Parallax Section */}
            <section className="parallax">
                <h2>Experience The Future of Invoicing</h2>
                <p>Easy, fast, and automated invoicing solutions tailored for your business.</p>
            </section>

            {/* Features Section */}
            <section className="features">
                <h2>Key Features</h2>
                <div className="feature-cards">
                    <div className="feature-card">
                        <h3>Instant Invoicing</h3>
                        <p>Create professional invoices in no time.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Tracking</h3>
                        <p>Track payments, history, and reminders in one place.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Multi-Device</h3>
                        <p>Access your invoices from any device, anywhere.</p>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="footer">
                <p>&copy; 2025 Invoice Generator. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
