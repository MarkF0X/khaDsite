import './App.css';
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import MastersSection from "./components/MastersSection";
import ContactsSection from "./components/ContactsSection";

function App() {
  return (
    <div className="App">
      <Header />
        <main>
            <HeroSection />
            <ServicesSection />
            <MastersSection />
            <ContactsSection />
        </main>
    </div>
  );
}

export default App;