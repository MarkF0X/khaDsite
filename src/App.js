import { useState } from 'react';
import './App.css';
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import MastersSection from "./components/MastersSection";
import ContactsSection from "./components/ContactsSection";

function App() {
    const [activeModal, setActiveModal] = useState(null);

    return (
        <div className="App">
            <Header activeModal={activeModal} setActiveModal={setActiveModal} />
            <main>
                <HeroSection />
                <ServicesSection setActiveModal={setActiveModal} />
                <MastersSection />
                <ContactsSection />
            </main>
        </div>
    );
}

export default App;