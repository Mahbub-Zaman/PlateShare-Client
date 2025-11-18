import { Link } from "react-router-dom";
import HeroSlider from '../components/Home/HeroSlider';
import FeaturedFoods from '../components/Home/FeaturedFoods';
import HowItWorks from '../components/Home/HowItWorks';
import OurMission from '../components/Home/OurMission';

const Home = () => (
  <div>
    <title>PlateShare | Home</title>
    <HeroSlider />
    <FeaturedFoods />
    <div className="text-center my-8">
      <Link to="/foods">
        <button className="btn btn-primary px-6 py-2 rounded-lg hover:btn-secondary transition">
          Show All Foods
        </button>
      </Link>
    </div>
    <div className="bg-gray-200">
      <HowItWorks />
      <OurMission />
    </div>
  </div>
);

export default Home;
