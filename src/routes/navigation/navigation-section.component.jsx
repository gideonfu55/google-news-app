import { NavLink } from 'react-router-dom';
import './navigation-section.styles.css';
import logo from '../../assets/images/google_news_logo.png';
import NewsSearchFilter from '../../components/news-search-filter/news-search-filter.component';

const NavigationSection = ({ articles, onFilteredResults }) => {

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
    <header className='navigation-section'>
      {/* Top row: Logo and NewsSearchFilter component */}
      <div className="top-bar">
        <div className="top-bar__logo-container">
          <NavLink to="/" className="top-bar_logo">
            <img src={logo} alt="GoogleNews Logo" />
          </NavLink>
        </div>
        <div className="search-container">
          <NewsSearchFilter 
            articles={articles}
            onFilteredResults={onFilteredResults}
          />
        </div>
      </div>

      {/* Navigation row to display categories and logo */}
      <div className="navigation-row">
        <nav className="navigation-row__nav">
          <NavLink to="/home"
            className={({ isActive }) =>
              `navigation-row__link ${isActive ? 'navigation-row__link--active' : ''}`
            }>
            {home.label}
          </NavLink>
          {categories.map(({ id, label }) => (
            <NavLink
              key={id}
              to={`/${id}`}
              className={({ isActive }) =>
                `navigation-row__link ${isActive ? 'navigation-row__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavigationSection;
