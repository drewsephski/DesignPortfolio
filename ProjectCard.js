import React from 'react';

function ProjectCard({ title, description }) {
    return (
        <div className="bg-light-blue p-4 rounded-md">
            <h3 className="text-white text-lg font-bold">{title}</h3>
            <p className="text-white text-sm">{description}</p>
        </div>
    );
}

export default ProjectCard;
