import { About } from "./components/About";
import { Achievements } from "./components/Achievements";
import { BadgeSlot } from "./components/badge/BadgeSlot";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";

const App = () => (
  <>
    <Nav />
    <main>
      <Hero badge={<BadgeSlot />} />
      <Marquee />
      <About />
      <Projects />
      <Services />
      <Experience />
      <Achievements />
      <Contact />
    </main>
    <Footer />
  </>
);

export default App;
