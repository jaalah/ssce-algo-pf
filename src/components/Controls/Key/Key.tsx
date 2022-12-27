import React from 'react';
import './Key.css';

const Key = () => {
    return (
        <div className="key-container">
            <div className="key">
                <span className="key-name">Visited</span>
                <div className="gridCell gridCell--visited" />
            </div>
            <div className="key">
                <span className="key-name">Wall</span>
                <div className="gridCell gridCell--wall" />
            </div>
            <div className="key">
                <span className="key-name">Path</span>
                <div className="gridCell gridCell--path" />
            </div>
            <div className="key">
                <span className="key-name">Block</span>
                <div className="gridCell gridCell--block" />
            </div>
        </div>
    );
};

export { Key };
