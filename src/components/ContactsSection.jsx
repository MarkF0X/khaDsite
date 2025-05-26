// ContactsSection.jsx
import React from 'react';
import './ContactsSection.css';

const ContactsSection = () => {
    const contacts = [
        { icon: '/icons/VK_Logo.png', label: 'Массаж', url: 'https://vk.com/beautyrelax_nn' },
        { icon: '/icons/VK_Logo.png', label: 'Маникюр', url: 'https://vk.com/beautyrelaxnail' },
        { icon: '/icons/Telegram_Logo.png', label: 'Канал', url: 'https://t.me/beauty_relax_nailstudio/185' },
        { icon: '/icons/Instagram_Logo.png', label: 'Instagram', url: 'https://vk.com/beautyrelax_nn' }
    ];

    return (
        <section className="contacts">
            <h2>Контакты</h2>
            <div className="contacts-grid">
                {contacts.map((contact, index) => (
                    <a
                        key={index}
                        href={contact.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-card"
                    >
                        <img src={contact.icon} alt={contact.label} />
                        <span>{contact.label}</span>
                    </a>
                ))}
            </div>
            <div className="map-container">
                <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A7720b3bee051c907cc17ecee27c9d545538dc1fa1223aa87cf79bbcca34a0f19&amp;source=constructor"
                    width="100%"
                    height="400"
                    frameBorder="0">
                </iframe>
            </div>
        </section>
    );
};

export default ContactsSection;