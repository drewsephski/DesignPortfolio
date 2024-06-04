import React, { useRef, useState } from 'react';
import Footer from './Footer';
import ProjectCard from './ProjectCard';

function UserDiv() {
    const canvasRef = useRef(null);
    const [role] = useState('Web');

    // Example handleMouseMove function for demonstration
    const handleMouseMove = () => {
        // Your mouse move logic here
    };

    return (
        <div className="relative w-full h-screen overflow-hidden" onMouseMove={handleMouseMove}>
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full bg-dark-blue"
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10">
                <div className="text-white text-4xl font-bold">
                    I am a <span className="typing">{role}</span> Developer
                </div>
                {/* Portfolio Section */}
                <div className="mt-10">
                    <h2 className="text-white text-2xl font-bold">Portfolio</h2>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <ProjectCard title="Drew's Pet Store" description="E-commerce shop using Tailwind CSS" />
                        <ProjectCard title="Project 2" description="Description of Project 2" />
                        <ProjectCard title="Project 3" description="Description of Project 3" />
                    </div>
                </div>
                <Footer />
            </div>
            <style>
                {`
                    .typing {
                        border-right: 2px solid white;
                        display: inline-block;
                        animation: blink 1s step-end infinite;
                    }
                    @keyframes blink {
                        50% {
                            border-color: transparent;
                        }
                    }
                    .bg-dark-blue {
                        background-color: #222831;
                    }
                    .bg-light-blue {
                        background-color: #395B64;
                    }
                `}
            </style>
        </div>
    );
}

export default UserDiv;
