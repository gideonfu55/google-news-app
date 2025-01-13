import { NavLink } from 'react-router-dom';
import './navigation-bar.styles.css';
import logo from '../../assets/images/google_news_logo.png';

const NavigationBar = () => {
  const categories = [
    { id: 'headlines', label: 'Headlines' },
    { id: 'local', label: 'Local' },
    { id: 'technology', label: 'Technology' },
    { id: 'finance', label: 'Finance' },
    { id: 'science', label: 'Science' },
    { id: 'sports', label: 'Sports' },
    { id: 'entertainment', label: 'Entertainment' },
  ];

  return (
    <div className="navigation-bar">
      <div className="navigation-bar__logo-container">
        <NavLink to="/" className="navigation-bar__logo">
          <img src={logo} alt="GoogleNews Logo" />
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
