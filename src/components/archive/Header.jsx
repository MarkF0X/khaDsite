import React, { useState, useRef, useEffect } from 'react';
import './Header.css';

// Вынесем хук useIsMobile наружу
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [isPriceHovered, setIsPriceHovered] = useState(false);
    const dropdownRef = useRef(null);
    const modalRef = useRef(null);
    const isMobile = useIsMobile();

    // Закрытие модального окна при клике вне его
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setActiveModal(null);
            }
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsPriceHovered(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const openModal = (modalName) => {
        setActiveModal(modalName);
        setIsMobileMenuOpen(false);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    // PDF-файлы
    const priceItems = [
        { name: 'Ручной массаж', file: '/pdf/hand-massage-price.pdf' },
        { name: 'LPG массаж', file: '/pdf/lpg-price.pdf' },
        { name: 'Ногтевой сервис', file: '/pdf/manic-pedic-price.pdf' },
    ];

    return (
        <header className="header">
            {/* Логотип */}
            <div className="logo" onClick={scrollToTop}>
                Beauty Relax
            </div>

            {/* Навигация для десктопа */}
            <nav className="desktop-nav">
                <button className="nav-button" onClick={() => openModal('about')}>
                    О компании
                </button>

                <div
                    className="price-container"
                    onMouseEnter={() => setIsPriceHovered(true)}
                    onMouseLeave={() => setTimeout(() => setIsPriceHovered(false), 300)}
                    ref={dropdownRef}
                >
                    <button className="nav-button">
                        Прайс
                    </button>
                    {isPriceHovered && (
                        <div className="dropdown-menu">
                            {priceItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="dropdown-item"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                <button className="nav-button" onClick={() => openModal('appointment')}>
                    Запись
                </button>

                <button className="nav-button" onClick={() => window.open('https://t.me/beautyrelax', '_blank')}>
                    Акции
                </button>

                <button className="nav-button" onClick={() => openModal('contacts')}>
                    Контакты
                </button>
            </nav>

            {/* Бургер-меню для мобильных устройств */}
            <div className="mobile-menu">
                <button className="burger-button" onClick={toggleMobileMenu}>
                    ☰
                </button>
                {isMobileMenuOpen && (
                    <div className="mobile-nav">
                        <button className="mobile-nav-button" onClick={() => openModal('about')}>
                            О компании
                        </button>

                        {/* Меню прайса - теперь полностью аналогично десктопному */}
                        <div
                            className="mobile-price-container"
                            onClick={() => setIsPriceHovered(!isPriceHovered)}
                        >
                            <button className="mobile-nav-button">
                                Прайс {isPriceHovered ? '▼' : '▶'}
                            </button>
                            {isPriceHovered && (
                                <div className="mobile-dropdown">
                                    {priceItems.map((item, index) => (
                                        <a
                                            key={index}
                                            href={item.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mobile-dropdown-item"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button className="mobile-nav-button" onClick={() => openModal('appointment')}>
                            Запись
                        </button>
                        <button className="mobile-nav-button" onClick={() => window.open('https://t.me/beautyrelax', '_blank')}>
                            Акции
                        </button>
                        <button className="mobile-nav-button" onClick={() => openModal('contacts')}>
                            Контакты
                        </button>
                    </div>
                )}
            </div>

            {/* Модальные окна */}
            {activeModal === 'about' && (
                <Modal title="О компании" onClose={closeModal} ref={modalRef}>
                    <p>Добро пожаловать в студию красоты "Beauty Relax"!</p>
                    <p>Мы предлагаем широкий спектр услуг по уходу за собой в уютной атмосфере с профессиональными
                        мастерами.</p>
                    <p>Работаем с 2015 года. Наши специалисты регулярно проходят обучение и повышают квалификацию.</p>
                </Modal>
            )}

            {activeModal === 'appointment' && (
                <Modal title="Запись" onClose={closeModal} ref={modalRef}>
                    <div className={`social-buttons ${isMobile ? 'vertical' : 'horizontal'}`}>
                        <a href="https://wa.me/79001234567" className="social-button whatsapp">
                            {isMobile && <span>WhatsApp</span>}
                            <img src="/icons/whatsapp.svg" alt="WhatsApp"/>
                        </a>
                        <a href="https://t.me/beautyrelax_bot" className="social-button telegram">
                            {isMobile && <span>Telegram</span>}
                            <img src="/icons/telegram.svg" alt="Telegram"/>
                        </a>
                        <a href="viber://chat?number=79001234567" className="social-button viber">
                            {isMobile && <span>Viber</span>}
                            <img src="/icons/viber.svg" alt="Viber"/>
                        </a>
                        <a href="https://www.instagram.com/beautyrelax" className="social-button instagram">
                            {isMobile && <span>Instagram</span>}
                            <img src="/icons/instagram.svg" alt="Instagram"/>
                        </a>
                    </div>
                    <p>Выберите удобный способ связи для записи</p>
                </Modal>
            )}

            {activeModal === 'contacts' && (
                <Modal title="Контакты" onClose={closeModal} ref={modalRef}>
                    <div className={`social-buttons ${isMobile ? 'vertical' : 'horizontal'}`}>
                        <a href="https://www.instagram.com/beautyrelax" className="social-button instagram">
                            <img src="/icons/instagram.svg" alt="Instagram"/>
                            <span>Instagram</span>
                        </a>
                        <a href="https://vk.com/beautyrelax" className="social-button vk">
                            <img src="/icons/vk.svg" alt="VK"/>
                            <span>ВКонтакте</span>
                        </a>
                        <a href="https://wa.me/79001234567" className="social-button whatsapp">
                            <img src="/icons/whatsapp.svg" alt="WhatsApp"/>
                            <span>WhatsApp</span>
                        </a>
                        <a href="tel:+79001234567" className="social-button phone">
                            <img src="/icons/phone.svg" alt="Phone"/>
                            <span>+7 (900) 123-45-67</span>
                        </a>
                    </div>
                    <p>Адрес: г. Москва, ул. Красивая, д. 15</p>
                    <p>Часы работы: 10:00 - 21:00 без выходных</p>
                </Modal>
            )}
        </header>
    );
};

// Компонент модального окна
const Modal = React.forwardRef(({title, children, onClose}, ref) => {
    return (
        <div className="modal-overlay">
            <div className="modal" ref={ref}>
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