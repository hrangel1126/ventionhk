import React from 'react';

const EngineerCard = ({
   candidateName,
   percentage,
   description,
   topSkills,
   hourRate
}) => {
    return (
        <div className="card">
            <div className="card__header">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-user"
                    width="100"
                    height="100"
                >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </div>

            <div className="card__body">
                <h2 className="card__title">{candidateName}</h2>
                <p className="card__role">Engineer • {percentage} Match</p>
                <p className="card__summary">{description}</p>
            </div>

            <div className="card__tech-stack">
                <h3>Tech Stack:</h3>
                <div className="card__tech-items">
                    {topSkills.split(', ').map((skill, skillIndex) => (
                        <span key={skillIndex} className="card__tech-item">{skill}</span>
                    ))}
                </div>
            </div>

            <div className="card__footer">
                <span className="card__rate">Rate: ${hourRate}/hour</span>
            </div>
        </div>
    );
};

export default EngineerCard