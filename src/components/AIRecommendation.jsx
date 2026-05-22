import React from 'react';

export default function AIRecommendation() {
    // Static/mock recommendations
    const recommendations = {
        burger: { name: 'Spicy Zinger Combo', details: 'Burger + Fries + Small Karak', price: 'Rs. 420' },
        drink: { name: 'Cardamom Karak', details: 'Most ordered drink', price: 'Rs. 120' },
        dessert: { name: 'Chocolate Muffin', details: 'Chef special', price: 'Rs. 90', tag: 'AI Predicted Favorite' }
    };

    return (
        <div className="ai-recommendation-card">
            <div className="rec-header">
                <h3>AI Recommended Meals For You</h3>
                <div className="rec-sub">Based on Order Trends</div>
            </div>

            <div className="rec-list">
                <div className="rec-item">
                    <div className="rec-left">
                        <div className="rec-emoji">🍔</div>
                        <div>
                            <strong>{recommendations.burger.name}</strong>
                            <div className="muted">{recommendations.burger.details}</div>
                        </div>
                    </div>
                    <div className="rec-right">{recommendations.burger.price}</div>
                </div>

                <div className="rec-item">
                    <div className="rec-left">
                        <div className="rec-emoji">🥤</div>
                        <div>
                            <strong>{recommendations.drink.name}</strong>
                            <div className="muted">Most popular drink</div>
                        </div>
                    </div>
                    <div className="rec-right">{recommendations.drink.price}</div>
                </div>

                <div className="rec-item highlight">
                    <div className="rec-left">
                        <div className="rec-emoji">🧁</div>
                        <div>
                            <strong>{recommendations.dessert.name}</strong>
                            <div className="muted">{recommendations.dessert.details}</div>
                        </div>
                    </div>
                    <div className="rec-right">
                        <div className="pred-label">{recommendations.dessert.tag}</div>
                        <div className="price">{recommendations.dessert.price}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
