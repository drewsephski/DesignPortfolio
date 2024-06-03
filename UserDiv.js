import React, { useRef, useState, useEffect } from 'react';

function UserDiv() {
    const canvasRef = useRef(null);
    const [nodes, setNodes] = useState([]);
    const [mouseNode, setMouseNode] = useState({ x: -1, y: -1, vx: 0, vy: 0 });
    const [role, setRole] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const roles = ['Full Stack', 'Software', 'App', 'Web', 'Game', 'UI/UX', 'React', 'Python'];

    const handleMouseMove = event => {
        setMouseNode({
            x: event.clientX,
            y: event.clientY,
            vx: 0,
            vy: 0,
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
                setRole(prevRole => prevRole.slice(0, -1));
            } else {
                setRole(roles[roleIndex].slice(0, role.length + 1));
            }
            if (!isDeleting && role === roles[roleIndex]) {
                setIsDeleting(true);
                clearInterval(typingInterval);
            } else if (isDeleting && role === '') {
                setIsDeleting(false);
                setRoleIndex(prevIndex => (prevIndex + 1) % roles.length);
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
                vy: (Math.random() - 0.5) * 0.3,
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

    return <div className="relative w-full h-screen overflow-hidden" onMouseMove={handleMouseMove}>
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
                    <header>
                        <div className="banner">
                            Get free delivery on orders over $75
                        </div>
                        <nav>
                            <div id="logo">
                                <svg
                                    width="40"
                                    height="32"
                                    viewBox="0 0 40 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12.8 32H0V21.9849C0 17.1239 4.0116 13.1839 8.96 13.1839H15.2V0.468341C15.2 0.251458 15.3792 0.0754376 15.6 0.0754376C15.7184 0.0754376 15.8308 0.127301 15.9068 0.216883L17.3616 1.92719C18.402 1.07577 19.74 0.563816 21.2 0.563816H22C23.442 0.563816 24.7656 1.06359 25.8 1.89654L27.2932 0.14066C27.3692 0.0514706 27.4812 0 27.6 0C27.8208 0 28 0.175628 28 0.392904V15.3896H23.36C17.528 15.3896 12.8 20.0337 12.8 25.7623V32Z"
                                        fill="#45413E"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M29.76 17.0569V12.0875C29.76 12.0836 29.76 12.0797 29.76 12.0758V6.79004C29.76 6.57435 29.9392 6.4 30.16 6.4C30.266 6.4 30.3676 6.44095 30.4424 6.51389L31.9576 7.98784C32.7864 7.42501 33.7936 7.09504 34.88 7.09504C35.97 7.09504 36.9808 7.42735 37.8112 7.99369L39.3176 6.52793C39.3924 6.45499 39.494 6.41404 39.6 6.41404C39.8208 6.41404 40 6.58878 40 6.80408V23.2632C40 28.0883 35.9884 32 31.04 32H14.4V25.7938C14.4 20.969 18.4116 17.0569 23.36 17.0569H29.76Z"
                                        fill="#45413E"
                                    />
                                </svg>

                                Drew's <br />
                                Pet Store
                            </div>
                            <ul className="navigation-menu">
                                <li>
                                    <a href="#">Products</a>
                                    <ul className="subnav">
                                        <li className="card-med" id="sup-dog">
                                            <div className="card-image">
                                                <img
                                                    src="https://ouch-cdn2.icons8.com/qPvaAv2gxwM3l0z7dl_eoh9v6h58HlzewBUfEgX6AZE/rs:fit:368:386/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMTIv/ZmM4YjNlYmItMDNj/Ni00NGM3LTliNGUt/YTUyOWUzOGU4NTE2/LnBuZw.png"
                                                />
                                            </div>
                                            <a href="#">
                                                <span>Dogs</span>
                                                <span>
                        Shop All{' '}
                                                    <span className="material-symbols-outlined">
                          arrow_forward
                        </span>
                      </span>
                                            </a>
                                        </li>
                                        <li className="card-med" id="sup-cat">
                                            <div className="card-image">
                                                <img
                                                    src="https://ouch-cdn2.icons8.com/US6gJ6fHUOJqruLB7KDe5zEa82iDSp7OdO-bv-aLtvU/rs:fit:368:310/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNjU5/LzdmOWU1ZjU0LTMx/ZDQtNDgwNS1iM2E2/LWM3NzgyMTcyNzIh/NC5wbmc.png"
                                                />
                                            </div>
                                            <a href="#">
                                                <span>Cats</span>
                                                <span>
                        Shop All{' '}
                                                    <span className="material-symbols-outlined">
                          arrow_forward
                        </span>
                      </span>
                                            </a>
                                        </li>
                                        <li className="card-med" id="sup-bird">
                                            <div className="card-image">
                                                <img
                                                    src="https://ouch-cdn2.icons8.com/6OkSfKKP476ZKzGJoDlXfXuWzX-vjlDRotIVMTz3lmo/rs:fit:368:396/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNzI3/LzQyYWIyNzliLWJj/ZDgtNGEyMC04MGRi/LTk3MzU4YWFmNTVk/OS5wbmc.png"
                                                />
                                            </div>
                                            <a href="#">
                                                <span>Birds</span>
                                                <span>
                        Shop All{' '}
                                                    <span className="material-symbols-outlined">
                          arrow_forward
                        </span>
                      </span>
                                            </a>
                                        </li>
                                        <li className="card-med" id="sup-fish">
                                            <div className="card-image">
                                                <img
                                                    src="https://ouch-cdn2.icons8.com/41Pv7w9rcbn7II_gB2vwvVCQRYE5mvpca1ZbsvMujR0/rs:fit:368:368/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNjE5/LzRlZjE1YTgyLTI3/NjYtNDlkNC1hMGE3/LWY4ZjRmNzhjM2M5/NS5wbmc.png"
                                                />
                                            </div>
                                            <a href="#">
                                                <span>Fish</span>
                                                <span>
                        Shop All{' '}
                                                    <span className="material-symbols-outlined">
                          arrow_forward
                        </span>
                      </span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">Services</a>
                                    <ul className="subnav">
                                        <li className="card-med" id="serv-groom">
                                            <div className="card-image">
                                                <img
                                                    src="https://ouch-cdn2.icons8.com/T11rfGmMKgcStJyAFKNgtOfE79cadabx0DVMnvzA9Pk/rs:fit:368:313/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNDQx/LzFlYWU4MWY3LWQ1/ZjYtNDM2Ny1hZjM5/LWVmNTFmMGM5Njk4/MS5wbmc.png"
                                                />
                                            </div>
                                            <a href="#">
                                                <span>Grooming</span>
                                                <span>More Info{' '}
                                                    <span className="material-symbols-outlined">
                          arrow_forward
                        </span>
                      </span>
                                            </a>
                                        </li>
                                        <li className="card-med" id="serv-board">
                                            <div className="card-image">
                                                <img
                                                    src="https://ouch-cdn2.icons8.com/F5Ea1suZtMYimKDkJr0CJLO_1bju6-bTyT1EuDKEg8s/rs:fit:368:254/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMjcx/LzVjMzE4NWM0LWZh/NTMtNGQ1OS05ZTM2/LTZjYzBhNGU3ODg0/NC5wbmc.png"
                                                />
                                            </div>
                                            <a href="#">
                                                <span>Boarding</span>
                                                <span>More Info{' '}
                                                    <span className="material-symbols-outlined">
                          arrow_forward
                        </span>
                      </span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#locate">Locations &amp; Hours</a>
                                </li>
                                <li>
                                    <a href="#">About Us</a>
                                </li>
                            </ul>
                            <div id="utility">
              <span className="material-symbols-outlined">
                search
              </span>
                                <span className="material-symbols-outlined">
                shopping_cart
              </span>
                            </div>
                        </nav>
                    </header>
                    <section className="hero">
                        <h1>Your One-Stop Shop for Every Pet's Needs!</h1>
                        <div className="btn-group">
                            <button className="btn-filled-dark">
              <span className="material-symbols-outlined">
                shopping_cart
              </span>
                                Shop All Products
                            </button>
                            <button className="btn-outline-dark btn-hover-color">
              <span className="material-symbols-outlined">
                calendar_month
              </span>
                                Book a Service
                            </button>
                        </div>
                    </section>
                    <section>
                        <h2>Shop by Pet</h2>

                        <ul className="shop-pets">
                            <li className="card-large card-light" id="sup-dog">
                                <div className="card-image">
                                    <img src="https://ouch-cdn2.icons8.com/5ccPOQq69UKQcbmXfjvOScfFc9NXKG0Xu6DPNQ8b0f8/rs:fit:368:247/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMTEw/LzFlODdiYzcyLTBl/OWEtNDFlNS05N2Ey/LTMzYTA4MDQ5MWU1/OC5wbmc.png"/>
                                </div>
                        <ul>
                        Dogs
                        <li><a href="#">Food &amp; Treats</a></li>
                        <li><a href="#">Toys</a></li>
                        <li><a href="#">Beds &amp; Furniture</a></li>
                        <li><a href="#">Outdoor Supplies</a></li>
                        <li><a href="#">Clothing</a></li>

                        <button class="btn-outline-light">Shop All<span class="material-symbols-outlined">
                        arrow_forward
                        </span></button>

                        </ul>


                        </li>

                        <li className="card-large card-dark" id="sup-cat">
                            <div className="card-image"><img src="https://ouch-cdn2.icons8.com/RjiKOF2gGKiIVnIMFi0O1a4aU7DoHfhbkXr2JbUYZ3A/rs:fit:368:313/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMzEy/LzliNDQ3MmVlLWZh/YjMtNDQwNy1iOWVh/LWMwOTdlYWNjNWE3/NS5wbmc.png" alt={pets}></div>
                        <ul>Cats
                        <li><a href="#">Food &amp; Treats</a></li>
                        <li><a href="#">Toys</a></li>
                        <li><a href="#">Beds &amp; Furniture</a></li>
                        <button className="btn-outline-dark">Shop All<span className="material-symbols-outlined">
                        arrow_forward
                        </span></button>
                        </ul>

                        </li>

                        <li class="card-large card-dark" id="sup-bird">
                        <div class="card-image"><img src="https://ouch-cdn2.icons8.com/DF-XRInvbvWS9fQSpWc_SegC3meXZK8BmE-PjrdrF3Q/rs:fit:368:396/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNzI3/LzQyYWIyNzliLWJj/ZDgtNGEyMC04MGRi/LTk3MzU4YWFmNTVk/OS5wbmc.png" alt={dogs}><div>

                        <ul>Birds
                        <li><a href="#">Food &amp; Treats</a></li>
                        <li><a href="#">Toys</a></li>
                        <li><a href="#">Furniture</a></li>
                        <button className="btn-outline-dark">Shop All<span className="material-symbols-outlined">
                        arrow_forward
                        </span></button>
                        </ul>

                        </li>
                        <li class="card-large card-light" id="sup-fish">
                        <div class="card-image"><img src="https://ouch-cdn2.icons8.com/41Pv7w9rcbn7II_gB2vwvVCQRYE5mvpca1ZbsvMujR0/rs:fit:368:368/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNjE5/LzRlZjE1YTgyLTI3/NjYtNDlkNC1hMGE3/LWY4ZjRmNzhjM2M5/NS5wbmc.png"/></div>

                        <ul>
                        Fish
                        <li><a href="#">Food</a></li>
                        <li><a href="#">Aquariums</a></li>
                        <li><a href="#">Rocks &amp; Decorations</a></li>
                        <button class="btn-outline-light">Shop All<span class="material-symbols-outlined">
                        arrow_forward
                        </span></button>
                        </ul>

                        </li>
                        </ul>
                        </section>

                        <section>
                        <h2>Our Services</h2>

                        <ul class="services">
                        <li class="card-large card-dark card-wide" id="serv-groom">
                        <div class="card-image"><img src="https://ouch-cdn2.icons8.com/T11rfGmMKgcStJyAFKNgtOfE79cadabx0DVMnvzA9Pk/rs:fit:368:313/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNDQx/LzFlYWU4MWY3LWQ1/ZjYtNDM2Ny1hZjM5/LWVmNTFmMGM5Njk4/MS5wbmc.png"></div>
                        <ul>
                        Dog Grooming<span class="subtitle">Tail-wagging transformations are our specialty.</span>
                        <li><a href="#">Coat Care</a><span>$80</span></li>
                        <li><a href="#">Nail Care</a><span>$16</span></li>
                        <li><a href="#">Doggie Deluxe Spa Day</a><span>$160</span></li>
                        <button class="btn-filled-dark"><span class="material-symbols-outlined">
                        calendar_month
                        </span>Book Now</button>

                        </ul>


                        </li>
                        <li class="card-large card-dark card-wide" id="serv-board">
                        <div class="card-image"><img src="https://ouch-cdn2.icons8.com/F5Ea1suZtMYimKDkJr0CJLO_1bju6-bTyT1EuDKEg8s/rs:fit:368:254/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMjcx/LzVjMzE4NWM0LWZh/NTMtNGQ1OS05ZTM2/LTZjYzBhNGU3ODg0/NC5wbmc.png"></div>
                        <ul>
                        Dog Boarding<span class="subtitle">Where fun and care never take a day off.</span>
                        <li><a href="#">Doggie Daycare</a><span>$80</span></li>
                        <li><a href="#">Short Term Boarding</a><span>$80</span></li>
                        <button class="btn-filled-dark"><span class="material-symbols-outlined">
                        calendar_month
                        </span>Book Now</button>
                        </ul>

                        </li>
                        </ul>
                        </section>

                        <section id="locate">

                        <div>
                        <h2>Location &amp; Hours</h2>
                        <p>Our knowledgeable and friendly staff is always ready to assist you in making the best choices for your furry, feathered, or finned friends.</p>
                        <div class="btn-group">
                        <button class="btn-filled-dark"><span class="material-symbols-outlined">
                        pin_drop
                        </span>Find a Store</button>
                        <button className="btn-outline-dark btn-hover-color"><span className="material-symbols-outlined">
                        contact_support
                        </span> Contact Us</button>
                        </div>
                        </div>
                        </section>

                        <footer>

                        <ul>
                        Products
                        <li><a href="#">Food &amp; Treats</a></li>
                        <li><a href="#">Toys</a></li>
                        <li><a href="#">Beds &amp; Furniture</a></li>
                        <li><a href="#">Outdoor Supplies</a></li>
                        <li><a href="#">Clothing</a></li>
                        <li><a href="#">Aquariums</a></li>
                        <li><a href="#">Rocks &amp; Decorations</a></li>
                        </ul>

                        <ul>
                        Shop by Pet
                        <li><a href="#">Dogs</a></li>
                        <li><a href="#">Cats</a></li>
                        <li><a href="#">Birds</a></li>
                        <li><a href="#">Fish</a></li>
                        </ul>


                        <ul>
                        Our Services
                        <li><a href="#">Grooming</a></li>
                        <li><a href="#">Boarding</a></li>
                        </ul>
                        <ul>
                        Drew's Pet Store
                        <li><a href="#">Locations &amp; Hours</a></li>
                        <li><a href="#">About Us</a></li>
                        </ul>
                        :root {
                        --text-01: #45413E;
                        --light-01: #F9F9F9;
                        --light-02: #FFFFFF;
                        --brand-01: #DB7F67;
                        --brand-02: #F4CFC6;
                        --card-hover: 0px 4px 24px rgba(0, 0, 0, 0.15);
                        --card-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
                        --hover-timing: all 0.2s ease;
                        --nav-card-size: 240px;

                        -webkit-font-smoothing: antialiased;
                        font-smoothing: antialiased;
                        scroll-behavior: smooth;


                    }

                    * {
                    box-sizing: border-box;
                    padding: 0;
                    margin: 0;
                }

                    body {
                    font-family: 'Google Sans', sans-serif;
                    font-weight: 500;
                    transition: var(--hover-timing);

                    background: var(--light-01);

                    width: 100vw;
                    overflow-x: hidden;

                }

                    header {
                    /*    width: 100%;*/
                    height: auto;
                    position: sticky;
                    top: 0;
                    /*    border: 1px solid red;*/
                    z-index: 100;
                }

                    .banner {
                    background: var(--brand-01);
                    color: var(--light-01);
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 1.2;
                    padding: 8px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                }

                    nav {
                    color: var(--text-01);
                    font-weight: 600;
                    height: 64px;
                    background: var(--light-01);
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 var(--pg-margin);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    z-index: 100;
                }

                    nav ul.navigation-menu {
                    display: flex;
                    flex-direction: row;
                    flex: 1;
                    justify-content: center;
                    position: relative;
                    top: 0;
                }

                    nav .navigation-menu a {
                    font-size: 16px;
                    text-decoration: none;
                    color: var(--text-01);

                }

                    nav .navigation-menu > li {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    /*    justify-items: center;*/
                }

                    nav .navigation-menu > li > a {
                    position: relative;
                    /*    border: 1px solid purple;*/
                    padding: 0 20px;
                    height: 64px;
                    display: flex;
                    align-items: center;
                    justify-items: center;
                }

                    nav .navigation-menu > li:hover ul.subnav {
                    visibility: visible;
                    opacity: 1;
                    top: 64px;

                }


                    nav .navigation-menu > li > ul.subnav {
                    /*    border: 1px solid green;*/
                    visibility: hidden;
                    position: absolute;
                    display: flex;
                    flex-direction: row;
                    top: 66px;
                    background: var(--light-01);
                    box-shadow: var(--card-hover);
                    border-radius: 12px;
                    opacity: 0;
                    transition: var(--hover-timing);
                }


                    nav > #logo {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    grid-gap: 8px;
                    line-height: 100%;
                }

                    nav > #logo > span {
                    font-size: 32px;
                }

                    nav > #utility {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    grid-gap: 16px;
                }

                    .card-large,
                    .card-med {
                    /*    border: 1px solid orange;*/
                    flex: 1;
                    /*    width: var(--nav-card-size);*/

                    position: relative;
                    display: flex;
                    flex-direction: column;
                    /*    padding: 24px;*/
                    transition: var(--hover-timing);
                    cursor: pointer;
                }


                    .card-large {
                    box-shadow: var(--card-shadow);
                    border-radius: 12px;
                    overflow: hidden;
                    /*    padding-bottom: 32px;*/
                }



                    .card-large:hover {
                    box-shadow: var(--card-hover);
                    transform: scale(1.01);
                }

                    .card-med:hover .card-image {
                    transform: scale(1.01);
                }


                    .card-image {
                    width: 100%;
                    /*    height: 90%;*/
                    aspect-ratio: 1/1;
                    position: relative;
                    border-radius: 12px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: var(--hover-timing);
                }

                    .card-large > .card-image {
                    aspect-ratio: 3/2;
                }

                    .card-image > img {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    object-fit: contain;



                }

                    .card-large a {
                    text-decoration: none;
                    font-weight: 600;
                }

                    .card-large > .card-image > a {
                    position: absolute;
                    bottom: 0;
                    z-index: 1;
                    width: 100%;
                    font-size: 24px;
                    line-height: 1.2;
                }




                    .card-large > ul {
                    /*    padding: 16px 0 24px;*/
                    display: flex;
                    flex-direction: column;
                    grid-gap: 8px;
                    flex: 1;
                    /*    border: 1px solid blue;*/

                    color: var(--text-01);

                    padding: 0 40px 40px;
                    font-size: 28px;
                    font-weight: 600;
                    line-height: 1.5;
                }



                    .card-large > ul > li a {
                    line-height: 32px;
                    font-size: 14px;
                    /*    border: 1px solid red;*/
                }


                    .card-large#sup-dog,
                    .card-med#sup-dog > .card-image {
                    background: linear-gradient(45deg, #463631 0%, #976C5B 100%);
                }


                    button.btn-outline {
                    color: var(--light-01);
                    border-color: var(--light-01);
                }


                    .card-large#sup-cat,
                    .card-med#sup-cat > .card-image {
                    background: linear-gradient(45deg, #F6AE6C 0%, #ECBD73 100%);
                }


                    .card-large#sup-bird,
                    .card-med#sup-bird > .card-image {
                    background: linear-gradient(45deg, #EFEFEF 0%, #F2F2F2 100%);
                }


                    .card-large#sup-fish,
                    .card-med#sup-fish > .card-image {
                    background: linear-gradient(45deg, #1E4782 0%, #709DDF 100%);
                }


                    .card-large.card-dark a,
                    .card-large.card-dark > ul {
                    color: var(--text-01);
                }

                    .card-large.card-light a,
                    .card-large.card-light > ul {
                    color: var(--light-01);
                }



                    button {
                    font-size: 14px;
                    font-weight: 600;
                    line-height: 24px;
                    padding: 12px 24px;
                    border-radius: 48px;
                    display: flex;
                    flex-direction: row;
                    grid-gap: 8px;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }



                    button.btn-outline-light {
                    color: var(--light-01);
                    background: none;
                    color: var(--light-01);
                    border: 2px solid var(--light-01);
                }

                    button.btn-outline-dark {
                    color: var(--text-01);
                    background: none;
                    color: var(--text-01);
                    border: 2px solid var(--text-01);
                }

                    button.btn-filled-dark {
                    color: var(--light-01);
                    background: var(--text-01);
                    color: var(--light-01);
                    border: 2px solid var(--text-01);
                }

                    .btn-outline-dark:hover {
                    background: var(--text-01);
                    border: 2px solid var(--text-01);
                }

                    .btn-outline-light:hover {
                    background: var(--light-01);
                    border: 2px solid var(--light-01);
                    color: var(--text-01);
                }


                    button:hover,
                    .btn-outline-dark.btn-hover-color:hover {
                    color: var(--light-01);
                    border: 2px solid var(--brand-01);
                    background: var(--brand-01);
                    transition: var(--hover-timing);
                    box-shadow: var(--card-hover);
                }


                    section,
                    footer {
                    position: relative;
                    width: 100%;
                    padding: 0 var(--pg-margin);
                }




                    section.hero {
                    /*    width: 100%;*/
                    height: auto;
                    background: var(--brand-02) url('https://ouch-cdn2.icons8.com/hxxz5Qr551KY1597yq-mz9zWRTkAT-cob5eZ8UreBBo/rs:fit:368:338/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNzcy/L2UxYjU4YWUwLTc3/YjQtNGQ1OC05NjJl/LWUzODQ1Y2IyYzBi/Ny5wbmc.png') no-repeat center right;

                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    grid-gap: 48px;
                    display: inline-flex;

                }

                    .btn-group {
                    display: flex;
                    flex-direction: row;
                    grid-gap: 16px;
                }

                    section.hero h1 {
                    font-size: var(--hero-text);
                    font-weight: 600;
                    line-height: 1.2;
                    width: 40%;

                    color: var(--text-01);
                }

                    .card-med {
                    width: var(--nav-card-size);
                    height: auto;
                    /*    border: 1px solid green;*/
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    padding: 0;
                }

                    .card-med > a {
                    display: flex;
                    flex-direction: column;
                    grid-gap: 4px;
                    padding: 12px 16px 0px;
                }

                    .card-med > a > span {
                    width: 100%;
                    /*    border: 1px solid blue;*/
                }

                    .card-med > a > span:nth-of-type(1) {
                    width: 100%;
                    /*    border: 1px solid blue;*/
                    font-size: 24px;
                    font-weight: 600;
                    line-height: 1.2;
                }

                    .card-med > a > span:nth-of-type(2) {
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 24px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    grid-gap: 6px;
                }

                    .card-med > a > span:nth-of-type(2) > span {
                    font-size: 18px;
                }

                    #serv-groom > .card-image {
                    background: linear-gradient(45deg, #45828C 0%, #A7D4D8 100%);
                }

                    #serv-board > .card-image {
                    background: linear-gradient(45deg, #EDDAA9 0%, #B87D93 100%);
                }

                    .card-med:hover .card-image {
                    box-shadow: var(--card-hover);
                }


                    .card-med > .card-image {
                    box-shadow: var(--card-shadow);
                }

                    .card-med > .card-image > img {
                    width: 80%;
                    height: 80%;
                    /*    border: 1px solid red;*/
                }

                    section:not(.hero) {
                    padding: calc(var(--pg-margin)/2) var(--pg-margin);
                }

                    section h2 {
                    font-size: 32px;
                    font-weight: 600;
                    line-height: 1.2;
                    text-align: center;
                    color: var(--text-01);
                    margin-bottom: 32px;
                    /*    padding-bottom: 24px;*/
                }


                    .card-wide {
                    flex-direction: row;
                    padding: 0;
                }

                    .card-wide .card-image {
                    width: 50%;
                    border-radius: 0;
                }

                    .card-image img {
                    width: 80%;
                    height: 80%;
                }

                    .card-wide > ul {
                    padding: 40px;
                }

                    .card-wide > ul > li {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    grid-gap: 24px;
                    margin-bottom: 16px;
                }


                    .card-wide .subtitle {
                    font-size: 14px;
                    line-height: 1.4;
                    font-weight: 500;
                    /*    margin-top: 8px;*/
                    margin-bottom: 24px;
                }

                    .card-wide > ul > li span {
                    font-size: 16px;
                }

                    .card-large > ul > li:last-of-type {
                    margin-bottom: 40px;
                }


                    .card-large button {
                    margin-top: auto;
                }

                    #locate > div {
                    background: var(--brand-02);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 80px 0;
                    border-radius: 12px;
                    box-shadow: var(--card-shadow);
                    transition: var(--hover-timing);
                    cursor: pointer;
                }

                    #locate > div:hover {
                    box-shadow: var(--card-hover);
                }

                    #locate h2 {
                    margin-top: 0;
                }

                    #locate p {
                    line-height: 1.5;
                    margin-bottom: 40px;
                    width: 50%;
                    text-align: center;
                }


                    .btn-group {
                    display: flex;
                    flex-direction: row;
                    grid-gap: 16px;
                }

                    footer {
                    background: var(--text-01);
                    padding: 80px 80px 0px;
                    margin-top: 80px;
                    display: flex;
                }



                    footer ul {
                    display: flex;
                    flex-direction: column;
                    grid-gap: 24px;
                    box-shadow: none;
                    flex: 1;
                    color: var(--light-01);
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 80px;

                }


                    footer ul li a {
                    color: var(--light-01);
                    text-decoration: none;
                    font-size: 14px;
                }


                    footer ul li {
                    color: var(--light-01);
                    padding: 0;

                }



                    @media only screen and (max-width: 600px) {
                    :root {
                    --pg-margin: 16px;
                }

                    section.hero {
                    aspect-ratio: 1/1;
                    padding-top: 64px;

                }

                    section.hero h1 {
                    --hero-text: 40px;
                    width: 80%;
                }

                    section.hero {
                    background-size: 85%;
                    background-position: 360% 60%;
                }

                    nav {
                    position: relative;
                }

                    nav ul.navigation-menu {
                    position: absolute;
                    position: absolute;
                    top: 64px;
                    background: var(--light-01);
                    left: 0;
                    z-index: -1;
                    width: 100vw;
                }

                    nav ul.navigation-menu li a {
                    font-size: 16px;
                    /*        padding: 0 12px;*/
                    white-space: nowrap;
                }

                    nav ul.navigation-menu .subnav {
                    display: none;
                }

                    nav ul.navigation-menu > li:hover .subnav {
                    display: none;
                }


                    .btn-group {
                    flex-direction: column;
                }

                    .shop-pets,
                    .services {
                    display: flex;
                    flex-direction: column;
                    grid-gap: 24px;
                    width: 100%;
                }

                    .services > li {
                    display: flex;
                    flex-direction: column;
                }

                    .services > li > .card-image {
                    width: 100%;
                }

                    section:not(.hero) {
                    padding: var(--pg-margin);
                }

                    #locate p {

                    width: 80%;
                }

                    footer {
                    flex-direction: column;
                    text-align: center;
                }


                }

                    @media only screen and (min-width: 600px) {
                    :root {
                    --pg-margin: 24px;
                }

                    section.hero h1 {
                    --hero-text: 40px;
                    width: 60%;
                }

                    section.hero {
                    aspect-ratio: 3/2;
                    background-size: 50%;
                    background-position: 90% 70%;
                    padding-top: 64px;

                }

                    nav {
                    position: relative;

                }

                    nav ul.navigation-menu {
                    position: absolute;
                    top: 64px;
                    background: var(--light-01);
                    left: 0;
                    z-index: -1;
                    width: 100vw;
                }

                    nav ul.navigation-menu li a {
                    font-size: 16px;
                    white-space: nowrap;
                }

                    nav ul.navigation-menu .subnav {
                    display: none;
                }

                    nav ul.navigation-menu > li:hover .subnav {
                    display: none;
                }

                    .btn-group {
                    display: flex;
                    flex-direction: column;
                }

                    .shop-pets {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-row: auto auto;
                    grid-column-gap: 24px;
                    grid-row-gap: 24px;
                }

                    .services {
                    display: flex;
                    flex-direction: column;
                    grid-gap: 24px;
                }

                    section:not(.hero) {
                    padding: var(--pg-margin);
                }

                    #locate p {

                    width: 60%;
                }

                    footer {
                    flex-direction: column;
                    text-align: center;
                }
                }

                    @media only screen and (min-width: 1200px) {
                    :root {
                    --pg-margin: 48px;
                }

                    section.hero h1 {
                    --hero-text: 48px;
                }

                    section.hero {
                    aspect-ratio: 2/1;

                }

                    .btn-group {
                    flex-direction: row;
                }

                    .shop-pets,
                    .services {
                    display: flex;
                    flex-direction: row;
                    grid-gap: 24px;
                }

                    ul.subnav {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-row: auto auto;
                    grid-column-gap: 24px;
                    grid-row-gap: 24px;
                    padding: 48px;
                }


                    nav ul.navigation-menu {
                    top: 0;
                    z-index: 1;
                    background: none;
                    width: auto;
                    position: relative;
                }

                    nav ul.navigation-menu .subnav {
                    display: flex;
                }

                    nav ul.navigation-menu > li:hover .subnav {
                    display: flex;
                }

                    #locate p {

                    width: 40%;
                }

                    footer {


                    flex-direction: row;
                    text-align: left;

                }
                }

                    /* Extra large devices (large laptops and desktops, 1200px and up) */
                    @media only screen and (min-width: 1200px) {
                    :root {
                    --pg-margin: 80px;
                }

                    section.hero h1 {
                    --hero-text: 56px;
                }

                    nav .navigation-menu > li > ul.subnav {
                    padding: 48px;
                    grid-gap: 24px;
                }

                    section.hero {
                    aspect-ratio: 3/1;
                    background-size: 30%;
                    background-position: 90% 60%;
                }

                    .shop-pets,
                    .services {
                    display: flex;
                    flex-direction: row;
                    grid-gap: 24px;
                }

                    nav ul.navigation-menu {
                    top: 0;
                    z-index: 1;
                    background: none;
                    width: auto;
                    position: relative;
                }

                    ul.subnav {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-row: auto auto;
                    grid-column-gap: 24px;
                    grid-row-gap: 24px;
                    padding: 48px;
                }

                    nav ul.navigation-menu > li:hover .subnav {
                    display: grid;
                }

                    #locate p {

                    width: 40%;
                }

                    footer {


                    flex-direction: row;
                    text-align: left;

                }

                }


                        </footer>}
                    <div className="bg-light-blue p-4 rounded-md">
                        <h3 className="text-white text-lg font-bold">Drew's Pet Store</h3>
                        <p className="text-white text-sm">E-commerce shop using Tailwind CSS </p>
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
