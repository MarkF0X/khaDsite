// ServicesSection.jsx
import React, { useState, useEffect } from 'react';
import './ServicesSection.css';

const servicesData = [
    {
        id: 'manicure',
        title: 'Маникюр',
        description: 'Идеальный маникюр и педикюр — это не просто ухоженные руки и ноги, а уверенность в каждой детали! Наши мастера используют только качественные материалы и стерильные инструменты, чтобы подарить вам безупречный результат. Гель-лак, укрепление ногтей, нежный спа-уход — мы сделаем так, чтобы ваши ручки и пяточки сияли здоровьем и красотой. Запишитесь и наслаждайтесь безупречным маникюром, который держится неделями!',
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
        description: 'Хотите подтянутую кожу, уменьшение объемов и избавление от целлюлита? LPG-массаж — это высокотехнологичная процедура, которая моделирует контуры тела, улучшает лимфоток и дарит коже упругость без боли и дискомфорта. Всего несколько сеансов — и вы заметите видимый результат! Подарите себе тело мечты без операций и жестких диет.',
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
        description: 'Настоящее расслабление и оздоровление в руках профессионалов! Наш ручной массаж снимет напряжение, улучшит кровообращение, поможет при болях в спине и подарит ощущение легкости во всем теле. Выбирайте классический, лимфодренажный или антицеллюлитный массаж — и забудьте о стрессе и усталости. Ваше тело скажет вам спасибо!',
        images: [
            '/services/massage1.jpg',
            '/services/massage2.jpg'
        ]
    },
    {
        id: 'brows',
        title: 'Брови',
        description: 'Идеальные брови — это основа гармоничного образа! Мы придадим им четкую форму, подберем идеальный изгиб и насыщенный оттенок. Ламинирование зафиксирует волоски, сделает брови более густыми и ухоженными без ежедневного макияжа. Ваш взгляд станет ярким и выразительным надолго!',
        images: [
            '/services/brows1.jpg',
            '/services/brows2.jpg'
        ]
    },
    {
        id: 'eyelashes',
        title: 'Ресницы',
        description: 'Густые, длинные, изогнутые ресницы без туши — это реальность! Наращивание придаст вашему взгляду выразительность на несколько недель, а ламинирование подчеркнет естественную красоту, делая ресницы темнее и объемнее. Просыпайтесь с идеальным взглядом каждый день!',
        images: [
            '/services/eyelashes1.jpg',
            '/services/eyelashes2.jpg'
        ]
    }
];

const ServicesSection = ({ setActiveModal }) => {
    const [activeService, setActiveService] = useState(servicesData[0].id);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    // Обработчик начала касания
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    // Обработчик движения пальца
    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    // Обработчик окончания касания
    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            // Свайп влево - следующий слайд
            nextImage();
        }

        if (touchStart - touchEnd < -50) {
            // Свайп вправо - предыдущий слайд
            prevImage();
        }
    };

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

                                    <div
                                        className="carousel-slide"
                                        onTouchStart={handleTouchStart}
                                        onTouchMove={handleTouchMove}
                                        onTouchEnd={handleTouchEnd}
                                    >
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
                                    <button
                                        className="book-button"
                                        onClick={() => setActiveModal('appointment')}
                                    >
                                        Записаться онлайн
                                    </button>
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