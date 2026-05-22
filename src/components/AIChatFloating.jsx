import React, { useState } from 'react';

export default function AIChatFloating() {
    const [open, setOpen] = useState(false);

    const demoMessages = [
        { from: 'ai', text: 'Hi! I can suggest a quick lunch combo. Want recommendations?' },
        { from: 'user', text: 'Yes, show me popular combos.' },
        { from: 'ai', text: 'Try the Spicy Zinger Combo — 85% match for your taste.' }
    ];

    return (
        <div>
            <div className={`ai-chat-fab ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
                <div className="fab-glow" />
                <div className="fab-label">Ask CafeAI</div>
            </div>

            {open && (
                <div className="ai-chat-popup">
                    <div className="ai-chat-header">
                        <strong>CafeAI Assistant</strong>
                        <button className="close-btn" onClick={() => setOpen(false)}>×</button>
                    </div>
                    <div className="ai-chat-body">
                        {demoMessages.map((m, i) => (
                            <div key={i} className={`msg ${m.from}`}>
                                <div className="msg-text">{m.text}</div>
                            </div>
                        ))}
                    </div>
                    <div className="ai-chat-actions">
                        <button className="btn btn-primary">Try Suggestion</button>
                        <button className="btn btn-secondary" onClick={() => setOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
