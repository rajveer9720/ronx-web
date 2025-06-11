import Cta from "./Cta";
import Features from "./Features";
import HeroHome from "./HeroHome";
import PageIllustration from "./PageIllustration";
// import Testimonials from "./Testimonials";
import Workflows from "./Workflows";
import "../css/style.css";
import Header from "../layout/Header";
import Faq from "./Faq";
import Footer from "../layout/Footer";
// import Dashboard from "./Activity";
import TelegramButton from "../layout/Telegram";

const Landing = () => {
  return (
    <div className="home-purple-gradient home-page-background">
      <Header />

      <PageIllustration />
      <HeroHome />
      {/* <Dashboard /> */}
      <Workflows />
      <Features />
      {/* <Testimonials /> */}
      <Faq />
      <Cta />
      <Footer />
      <TelegramButton />
    </div>
  );
};

export default Landing;
