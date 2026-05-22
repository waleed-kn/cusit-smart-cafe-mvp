import React from 'react';

export default function DeveloperCard() {
    return (
        <div className="developer-card">
            <div className="dev-avatar">
                <svg viewBox="0 0 80 80" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="dgrad" x1="0" x2="1">
                            <stop offset="0%" stopColor="#60a5fa" />
                            <stop offset="100%" stopColor="#2b6cff" />
                        </linearGradient>
                    </defs>
                    <rect x="0" y="0" width="80" height="80" rx="16" fill="url(#dgrad)" opacity="0.12" />
                    <g fill="#fff">
                        <circle cx="40" cy="30" r="14" opacity="0.98" />
                        <rect x="22" y="46" width="36" height="10" rx="5" opacity="0.95" />
                    </g>
                </svg>
            </div>

            <div className="dev-info">
                <h4> Muhammad Waleed</h4>
                <div className="dev-role">MERN Stack Developer & Software Engineering Student</div>
                <div className="dev-project">Project: CUSIT Smart Café Pre-Ordering System</div>

                <div className="dev-tags">
                    <span>MongoDB</span>
                    <span>Express.js</span>
                    <span>React.js</span>
                    <span>Node.js</span>
                    <span>Tailwind CSS</span>
                    <span>AI Integration</span>
                </div>
            </div>
        </div>
    );
}
