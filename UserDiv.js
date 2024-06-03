import React, { useRef, useState, useEffect } from 'react';
function UserDiv() {
    const canvasRef = useRef(null);
    const [nodes, setNodes] = useState([]);
    const [mouseNode, setMouseNode] = useState({ x: -1, y: -1, vx: 0, vy: 0 });
    const [role, setRole] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const roles = ['Full Stack', 'Backend', 'App', 'Web', 'Game', 'Data Science'];
    const handleMouseMove = (event) => {
        setMouseNode({
            x: event.clientX,
            y: event.clientY,
            vx: 0,
            vy: 0
        });
    };
    const updateCanvasSize = () => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    useEffect(() => {
        window.addEventListener('resize', updateCanvasSize);
        updateCanvasSize();
        setNodes(generateNodes(300, window.innerWidth, window.innerHeight));
        return () => {
            window.removeEventListener('resize', updateCanvasSize);
        };
    }, []);
    useEffect(() => {
        let typingInterval = setInterval(() => {
            if (isDeleting) {
                setRole((prevRole) => prevRole.slice(0, -1));
            } else {
                setRole(roles[roleIndex].slice(0, role.length + 1));
            }
            if (!isDeleting && role === roles[roleIndex]) {
                setIsDeleting(true);
                clearInterval(typingInterval);
            } else if (isDeleting && role === '') {
                setIsDeleting(false);
                setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
                clearInterval(typingInterval);
            }
        }, isDeleting ? 100 : 200);
        return () => clearInterval(typingInterval);
    }, [role, isDeleting, roleIndex]);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let frameId;
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const allNodes = [...nodes, mouseNode];
            allNodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
                drawNode(ctx, node, allNodes);
            });
            frameId = requestAnimationFrame(render);
        };
        render();
        return () => {
            cancelAnimationFrame(frameId);
        };
    }, [nodes, mouseNode]);
    function generateNodes(count, width, height) {
        let newNodes = [];
        for (let i = 0; i < count; i++) {
            let newNode = {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3
            };
            newNodes.push(newNode);
        }
        return newNodes;
    }
    function drawNode(ctx, node, allNodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
        // Draw lines to close nodes
        const maxDistance = 100;
        allNodes.forEach(otherNode => {
            const dx = otherNode.x - node.x;
            const dy = otherNode.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(otherNode.x, otherNode.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
                ctx.stroke();
            }
        });
    }
    return (
        <div className="relative w-full h-screen overflow-hidden" onMouseMove={handleMouseMove}>
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full bg-dark-blue" />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10">
                <div className="text-white text-4xl font-bold">
                    I am a <span className="typing">{role}</span> Developer
                </div>
                {/* Portfolio Section */}
                <div className="mt-10">
                    <h2 className="text-white text-2xl font-bold">Portfolio</h2>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {/* Add your portfolio items here */}
                        <div className="bg-light-blue p-4 rounded-md">
                            <h3 className="text-white text-lg font-bold">Project 1</h3>
                            <p className="text-white text-sm">Description of Project 1</p>
                        </div>
                        <div className="bg-light-blue p-4 rounded-md">
                            <h3 className="text-white text-lg font-bold">Project 2</h3>
                            <p className="text-white text-sm">Description of Project 2</p>
                        </div>
                        <div className="bg-light-blue p-4 rounded-md">
                            <h3 className="text-white text-lg font-bold">Project 3</h3>
                            <p className="text-white text-sm">Description of Project 3</p>
                        </div>
                    </div>
                </div>
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
