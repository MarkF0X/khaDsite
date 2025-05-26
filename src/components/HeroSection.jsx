// HeroSection.jsx
import React, { useRef, useEffect } from 'react';
import './HeroSection.css';

const HeroSection = () => {
    const parallaxRef = useRef(null);
    const services = [
        'Маникюр', 'Педикюр', 'Ручной массаж',
        'LPG массаж', 'Брови', 'Ресницы'
    ];

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            parallaxRef.current.style.transform = `translate(-${x * 20}px, -${y * 20}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="hero">
            <div className="parallax-background" ref={parallaxRef}></div>
            <div className="hero-content">
                <div className="logo-container">
                    <img
                        src="/logo/logo-0.png"
                        alt="Beauty Relax Studio"
                        className="main-logo"
                    />
                </div>
                <div className="hero-info">
                    <h1>Beauty Relax</h1>
                    <div className="services-list">
                        {services.map((service, index) => (
                            <span key={index} className="service-tag">{service}</span>
                        ))}
                    </div>
                    <div className="address">
                        <img src="/icons/Yandex_Maps.png" alt="Адрес" />
                        <p>Нижний Новгород, Печёрский съезд, 18, 3 этаж, каб. 310</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;