import React, { useState, useRef, useEffect } from 'react';
import './Header.css';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const mobileMenuRef = useRef(null);
    const modalRef = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Закрытие мобильного меню и модалок при клике вне их
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) &&
                event.target.className !== 'burger-button') {
                setIsMobileMenuOpen(false);
            }

            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Анимация появления модального окна
    useEffect(() => {
        if (activeModal) {
            setIsModalVisible(true);
        }
    }, [activeModal]);

    const closeModal = () => {
        setIsModalVisible(false);
        setTimeout(() => setActiveModal(null), 300);
    };

    // Данные для прайса
    const priceItems = [
        { name: 'Ручной массаж', file: '/pdf/hand-massage-price.pdf', icon: '/icons/massage.png' },
        { name: 'LPG массаж', file: '/pdf/lpg-price.pdf', icon: '/icons/lpg.png' },
        { name: 'Маникюр', file: '/pdf/manic-pedic-price.pdf', icon: '/icons/nails.png' }
    ];

    // Соцсети
    const socialLinks = [
        { icon: '/icons/WhatsApp_Logo.png', url: 'https://wa.me/79001234567', label: 'WhatsApp' },
        { icon: '/icons/Telegram_Logo.png', url: 'https://t.me/beautyrelax', label: 'Telegram' },
        { icon: '/icons/Instagram_Logo.png', url: 'https://instagram.com/beautyrelax', label: 'Instagram' }
    ];

    // Ссылки на администратора
    const adminLinks = [
        { icon: '/icons/WhatsApp_Logo.png', url: 'https://wa.me/79001234567', label: 'WhatsApp' },
        { icon: '/icons/Telegram_Logo.png', url: 'https://t.me/beautyrelax', label: 'Telegram' },
        { icon: '/icons/VK_Logo.png', url: 'https://t.me/beautyrelax', label: 'Вконтакте' }
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const openModal = (modalName) => {
        setActiveModal(modalName);
        setIsMobileMenuOpen(false);
    };

    // Общий компонент кнопки
    const ActionButton = ({ item, isPrice = false }) => (
        <a
            href={isPrice ? process.env.PUBLIC_URL + item.file : item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="action-button"
        >
            <div className="button-icon-container">
                <img src={item.icon} alt={item.name} className="button-icon" />
            </div>
            <span className="button-label">{item.name || item.label}</span>
        </a>
    );

    return (
        <header className="header">
            {/* Логотип */}
            <div className="logo" onClick={scrollToTop}>
                Beauty Relax
            </div>

            {/* Десктопное меню */}
            <nav className="desktop-nav">
                <button className="nav-button" onClick={() => openModal('about')}>
                    О компании
                </button>

                <button className="nav-button" onClick={() => openModal('price')}>
                    Прайс
                </button>

                <button className="nav-button" onClick={() => openModal('appointment')}>
                    Запись
                </button>

                <button
                    className="nav-button"
                    onClick={() => window.open('https://t.me/beautyrelax_promo', '_blank')}
                >
                    Акции
                </button>

                <button className="nav-button" onClick={() => openModal('contacts')}>
                    Контакты
                </button>
            </nav>

            {/* Мобильное меню */}
            <div className="mobile-menu">
                <button className="burger-button" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? '✕' : '☰'}
                </button>

                {isMobileMenuOpen && (
                    <div className="mobile-nav" ref={mobileMenuRef}>
                        <button className="mobile-nav-button" onClick={() => openModal('about')}>
                            О компании
                        </button>

                        <button className="mobile-nav-button" onClick={() => openModal('price')}>
                            Прайс
                        </button>

                        <button className="mobile-nav-button" onClick={() => openModal('appointment')}>
                            Запись
                        </button>

                        <button
                            className="mobile-nav-button"
                            onClick={() => window.open('https://t.me/beautyrelax_promo', '_blank')}
                        >
                            Акции
                        </button>

                        <button className="mobile-nav-button" onClick={() => openModal('contacts')}>
                            Контакты
                        </button>
                    </div>
                )}
            </div>

            {/* Модальные окна */}
            {activeModal && (
                <Modal
                    title={
                        activeModal === 'about' ? 'О компании' :
                            activeModal === 'price' ? 'Наши услуги и цены' :
                                activeModal === 'appointment' ? 'Записаться на услугу' :
                                    'Наши контакты'
                    }
                    onClose={closeModal}
                    ref={modalRef}
                    isVisible={isModalVisible}
                >
                    {activeModal === 'about' && (
                        <div className="modal-content-text">
                            <p>Студия красоты "Beauty Relax" - это место, где каждая женщина может почувствовать себя особенной.</p>
                            <p>Мы работаем с 2015 года и за это время создали уютное пространство с профессиональными мастерами.</p>
                        </div>
                    )}

                    {activeModal === 'price' && (
                        <>
                            <div className="action-buttons">
                                {priceItems.map((item, index) => (
                                    <ActionButton key={index} item={item} isPrice={true} />
                                ))}
                            </div>
                            <p className="modal-hint">Нажмите на услугу, чтобы посмотреть полный прайс</p>
                        </>
                    )}

                    {activeModal === 'appointment' && (
                        <>
                            <div className="action-buttons">
                                {adminLinks.map((item, index) => (
                                    <ActionButton key={index} item={item} />
                                ))}
                            </div>
                            <p className="modal-hint">Выберите удобный способ связи</p>
                        </>
                    )}

                    {activeModal === 'contacts' && (
                        <>
                            <div className="action-buttons">
                                {socialLinks.map((item, index) => (
                                    <ActionButton key={index} item={item} />
                                ))}
                            </div>
                            <div className="contact-info">
                                <p><img src="/icons/Yandex_Maps.png" alt="Адрес" className="info-icon" /> Нижний Новгород, Печёрский съезд, 18</p>
                                <p><img src="/icons/Phone_Call_Logo.png" alt="Телефон" className="info-icon" /> <a href="tel:+79001234567">+7 (900) 123-45-67</a></p>
                            </div>
                        </>
                    )}
                </Modal>
            )}
        </header>
    );
};

// Компонент модального окна с анимацией
const Modal = React.forwardRef(({ title, children, onClose, isVisible }, ref) => {
    return (
        <div className={`modal-overlay ${isVisible ? 'visible' : ''}`}>
            <div className={`modal ${isVisible ? 'visible' : ''}`} ref={ref}>
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="close-button" onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
});

export default Header;