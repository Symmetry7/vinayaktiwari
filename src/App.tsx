import { AboutTerminals } from "./components/AboutTerminals";
import { BadgeSlot } from "./components/badge/BadgeSlot";
import { Connect } from "./components/Connect";
import { Extras } from "./components/Extras";
import { Footer } from "./components/Footer";
import { GoldCursor } from "./components/GoldCursor";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { TechOrbit } from "./components/TechOrbit";

const App = () => (
  <>
    <GoldCursor />
    <Nav />
    <main>
      <Hero badge={<BadgeSlot />} />
      <Marquee />
      <AboutTerminals />
      <Projects />
      <Services />
      <TechOrbit />
      <Extras />
      <Connect />
    </main>
    <Footer />
  </>
);

export default App;
