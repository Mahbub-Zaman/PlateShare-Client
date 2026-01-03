import { Link } from "react-router-dom";
import HeroSlider from '../components/Home/HeroSlider';
import FeaturedFoods from '../components/Home/FeaturedFoods';
import HowItWorks from '../components/Home/HowItWorks';
import OurMission from '../components/Home/OurMission';
import Why from "../components/Home/Why";
import CTASection from "../components/Home/CTASection";

const Home = () => (
  <div>
    <title>PlateShare | Home</title>
    
    <HeroSlider />
    <div className="primary-bg">
     <FeaturedFoods /> 
    <div className="text-center">
      <Link to="/foods">
        <button className="btn btn-primary mb-10 px-6 py-2 rounded-lg hover:btn-secondary transition">
          Show All Foods
        </button>
      </Link>
    </div>
    </div>
    

    <div className="secondary-bg">
      <HowItWorks />
    </div>
      <Why />
      <OurMission />
      <CTASection />

  </div>
);

export default Home;
