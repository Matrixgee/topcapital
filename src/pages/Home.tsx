import Choose from "./choose";
import Faq from "./faq";
import Hero from "./Hero";
import Services from "./services";
import Testimonials from "./testimonals";

const Home = () => {
  return (
    <>
      <Hero />
      <Choose />
      <Services />
      <Testimonials />
      <Faq />
    </>
  );
};

export default Home;
