import React from 'react';
import AIRecommendation from './AIRecommendation';

export default function AIHero() {
    return (
        <section className="ai-hero-section">
            <div className="container ai-hero-grid">
                <div className="ai-hero-content">
                    <span className="ai-badge">AI-Powered</span>
                    <h2 className="ai-hero-title">AI-Powered Smart Café Experience</h2>
                    <p className="ai-hero-sub">Personalized food recommendations, smart ordering, and intelligent analytics.</p>

                    <div className="ai-hero-center">
                        <div className="ai-assistant-card">
                            <div className="ai-avatar">
                                <svg viewBox="0 0 64 64" width="84" height="84" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                    <defs>
                                        <linearGradient id="g" x1="0" x2="1">
                                            <stop offset="0%" stopColor="#4fc3ff" />
                                            <stop offset="100%" stopColor="#2b6cff" />
                                        </linearGradient>
                                    </defs>
                                    <rect x="8" y="12" width="48" height="40" rx="8" fill="url(#g)" opacity="0.14" />
                                    <g fill="#fff">
                                        <circle cx="32" cy="28" r="10" opacity="0.96" />
                                        <rect x="20" y="36" width="24" height="8" rx="4" opacity="0.9" />
                                    </g>
                                </svg>
                            </div>

                            <div className="ai-card-body">
                                <h3>Meet CafeAI</h3>
                                <p className="muted">Your assistant for smarter choices and faster service.</p>
                                <div className="ai-flags">
                                    <span className="flag">Personalized Picks</span>
                                    <span className="flag">Order Forecast</span>
                                </div>
                            </div>

                            <div className="ai-glow" />
                        </div>

                        <AIRecommendation />
                    </div>
                </div>

                <div className="ai-visuals">
                    <div className="ai-particles" />
                    <div className="ai-future-card">
                        <h4>Instant Insights</h4>
                        <p>See trending combos and quick prep estimates.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
