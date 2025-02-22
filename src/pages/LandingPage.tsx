import { Link } from 'react-router-dom';
import Button from '../components/Button';

const SunLogo = new URL('../assets/Sun-logo.svg', import.meta.url).href;
const Vector1 = new URL('../assets/Vector1.svg', import.meta.url).href;
const Vector2 = new URL('../assets/Vector2.svg', import.meta.url).href;
const Vector3 = new URL('../assets/Vector3.svg', import.meta.url).href;
const Vector4 = new URL('../assets/Vector4.svg', import.meta.url).href;

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-header">
        <img
          src={SunLogo}
          alt="Sun Logo"
        />
        <h1>Swift Project</h1>
      </div>
      <div className="landing-description">
        <p>
          Having trouble planning your project timeline? <br />
          Our tool can help you generates them in only 5 clicks.
        </p>
        <div>
          <Link to="/form">
            <Button>Try Now!</Button>
          </Link>
        </div>
      </div>
      <img
        className="vector-1"
        src={Vector1}
        alt="Vector 1"
      />
      <img
        className="vector-2"
        src={Vector2}
        alt="Vector 2"
      />
      <img
        className="vector-3"
        src={Vector3}
        alt="Vector 3"
      />
      <img
        className="vector-4"
        src={Vector4}
        alt="Vector 4"
      />
    </div>
  );
};

export default LandingPage;
