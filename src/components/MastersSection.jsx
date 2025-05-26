// MastersSection.jsx
import React from 'react';
import './MastersSection.css';

const masters = [
    {
        name: 'Виктория',
        position: 'Руководитель',
        experience: '30 лет опыта',
        skills: ['Маникюр', 'Наращивание', 'Дизайн'],
        image: '/masters/victoria.png'
    },
    {
        name: 'Виктория',
        position: 'Руководитель',
        experience: '30 лет опыта',
        skills: ['Маникюр', 'Наращивание', 'Дизайн'],
        image: '/masters/victoria.png'
    },
    {
        name: 'Виктория',
        position: 'Руководитель',
        experience: '30 лет опыта',
        skills: ['Маникюр', 'Наращивание', 'Дизайн'],
        image: '/masters/victoria.png'
    },
    {
        name: 'Виктория',
        position: 'Руководитель',
        experience: '30 лет опыта',
        skills: ['Маникюр', 'Наращивание', 'Дизайн'],
        image: '/masters/victoria.png'
    },
    {
        name: 'Виктория',
        position: 'Руководитель',
        experience: '30 лет опыта',
        skills: ['Маникюр', 'Наращивание', 'Дизайн'],
        image: '/masters/victoria.png'
    },
    {
        name: 'Виктория',
        position: 'Руководитель',
        experience: '30 лет опыта',
        skills: ['Маникюр', 'Наращивание', 'Дизайн'],
        image: '/masters/victoria.png'
    },
    {
        name: 'Виктория',
        position: 'Руководитель',
        experience: '30 лет опыта',
        skills: ['Маникюр', 'Наращивание', 'Дизайн'],
        image: '/masters/victoria.png'
    },
    // Добавьте других мастеров
];

const MastersSection = () => {
    return (
        <section className="masters">
            <div className="masters-container"> {/* Новый контейнер */}
                <h2>Наши мастера</h2>
                <div className="masters-carousel">
                    {masters.map((master, index) => (
                        <div key={index} className="master-card">
                            <div className="master-image">
                                <img src={master.image} alt={master.name}/>
                                <div className="master-badge">{master.position}</div>
                            </div>
                            <div className="master-info">
                                <h3>{master.name}</h3>
                                <p className="experience">{master.experience}</p>
                                <div className="skills">
                                    {master.skills.map((skill, i) => (
                                        <span key={i} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
);
};

export default MastersSection;