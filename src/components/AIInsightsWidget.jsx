import React from 'react';

export default function AIInsightsWidget() {
    const insights = {
        bestTime: '12:30 PM - 1:15 PM',
        lowCrowd: '10:00 AM - 11:00 AM',
        prepTime: 'Avg 6 mins',
        peakHours: '1:00 PM - 2:00 PM'
    };

    return (
        <div className="ai-insights-widget">
            <div className="widget-header">
                <h3>AI Smart Insights</h3>
                <div className="widget-sub">Actionable predictions from order patterns</div>
            </div>

            <div className="insights-grid">
                <div className="insight-card">
                    <h4>Best Time to Order</h4>
                    <p className="insight-value">{insights.bestTime}</p>
                </div>

                <div className="insight-card">
                    <h4>Low Crowd Timing</h4>
                    <p className="insight-value">{insights.lowCrowd}</p>
                </div>

                <div className="insight-card">
                    <h4>Est. Preparation</h4>
                    <p className="insight-value">{insights.prepTime}</p>
                </div>

                <div className="insight-card">
                    <h4>Peak Hours Prediction</h4>
                    <p className="insight-value">{insights.peakHours}</p>
                </div>
            </div>
        </div>
    );
}
