// ServicesSection.jsx
import React, { useState, useEffect } from 'react';
import './ServicesSection.css';

const servicesData = [
    {
        id: 'manicure',
        title: 'Маникюр',
        description: 'Профессиональный маникюр с использованием премиальных материалов.',
        images: [
            '/services/manicure1.jpg',
            '/services/manicure2.jpg',
            '/services/manicure3.jpg',
            '/services/manicure4.jpg',
            '/services/manicure5.jpg',
            '/services/manicure6.jpg',
            '/services/manicure7.jpg',
            '/services/manicure8.jpg',
            '/services/manicure9.jpg',
            '/services/manicure10.jpg',
            '/services/manicure11.jpg',
            '/services/manicure12.jpg',
            '/services/manicure13.jpg',
            '/services/manicure14.jpg',
            '/services/manicure15.jpg',
            '/services/manicure16.jpg',
            '/services/manicure17.jpg',
            '/services/manicure18.jpg',
            '/services/manicure19.jpg',
        ]
    },
    {
        id: 'lpg',
        title: 'LPG массаж',
        description: 'Аппаратный массаж для коррекции фигуры.',
        images: [
            '/services/lpg1.png',
            '/services/lpg2.png',
            '/services/lpg3.png',
            '/services/lpg4.png'
        ]
    },
    {
        id: 'massage',
        title: 'Ручной массаж',
        description: 'Расслабляющий и лечебный ручной массаж.',
        images: [
            '/services/massage1.jpg',
            '/services/massage2.jpg'
        ]
    }
];

const ServicesSection = () => {
    const [activeService, setActiveService] = useState(servicesData[0].id);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Сбрасываем индекс при смене услуги
    useEffect(() => {
        setCurrentImageIndex(0);
    }, [activeService]);

    const nextImage = () => {
        const currentService = servicesData.find(s => s.id === activeService);
        setCurrentImageIndex((prev) => (prev + 1) % currentService.images.length);
    };

    const prevImage = () => {
        const currentService = servicesData.find(s => s.id === activeService);
        setCurrentImageIndex((prev) =>
            (prev - 1 + currentService.images.length) % currentService.images.length
        );
    };

    return (
        <section className="services" id="services">
            <h2>Наши услуги</h2>
            <div className="service-tabs">
                {servicesData.map(service => (
                    <button
                        key={service.id}
                        className={`tab-button ${activeService === service.id ? 'active' : ''}`}
                        onClick={() => setActiveService(service.id)}
                    >
                        {service.title}
                    </button>
                ))}
            </div>

            <div className="service-content">
                {servicesData.map(service => (
                    <div
                        key={service.id}
                        className={`service-details ${activeService === service.id ? 'active' : ''}`}
                    >
                        {activeService === service.id && (
                            <>
                                <div className="service-carousel">
                                    <button
                                        className="carousel-arrow left"
                                        onClick={prevImage}
                                        aria-label="Предыдущее изображение"
                                    >
                                        &lt;
                                    </button>

                                    <div className="carousel-slide">
                                        <img
                                            src={service.images[currentImageIndex]}
                                            alt={`${service.title} - пример ${currentImageIndex + 1}`}
                                            loading="lazy"
                                        />
                                        <div className="carousel-counter">
                                            {currentImageIndex + 1} / {service.images.length}
                                        </div>
                                    </div>

                                    <button
                                        className="carousel-arrow right"
                                        onClick={nextImage}
                                        aria-label="Следующее изображение"
                                    >
                                        &gt;
                                    </button>
                                </div>

                                <div className="service-description">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <button className="book-button">Записаться онлайн</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServicesSection;