import { NavLink } from 'react-router-dom';
import './navigation-section.styles.css';
import logo from '../../assets/images/google_news_logo.png';

const NavigationBar = () => {

  const home = { id: 'home', label: 'Home' };

  const categories = [
    { id: 'headlines', label: 'Headlines' },
    { id: 'business', label: 'Business' },
    { id: 'technology', label: 'Technology' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'sports', label: 'Sports' },
    { id: 'science', label: 'Science' },
    { id: 'health', label: 'Health' }
  ];

  return (
    // Navigation bar to display categories and logo
    <div className="navigation-bar">
      <div className="navigation-bar__logo-container">
        <NavLink to="/" className="navigation-bar__logo">
          <img src={logo} alt="GoogleNews Logo" />
        </NavLink>
      </div>
      <div className="navigation-bar__homenav-container">
        <NavLink to="/home" className="navigation-bar__homenav">
          {home.label}
        </NavLink>
      </div>
      <nav className="navigation-bar__nav">
        {categories.map(({ id, label }) => (
          <NavLink
            key={id}
            to={`/${id}`}
            className={({ isActive }) =>
              `navigation-bar__link ${isActive ? 'navigation-bar__link--active' : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default NavigationBar;
