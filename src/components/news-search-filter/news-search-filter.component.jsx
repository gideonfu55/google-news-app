import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import './news-search-filter.styles.css';

import NewsApiService from '../../services/apis/news-api-service';
import { buildQueryFromParams } from './utils/buildQueryFromParams';

/**
 * NewsSearchFilter component to filter news articles based on search criteria.
 * @param {Function} onFilteredResults - Callback function to return filtered articles
 * @returns {JSX.Element}
 * @constructor
 * @see
 * Usage in App.js
 **/
const NewsSearchFilter = ({ onFilteredResults = () => {} }) => {

  // Navigation hook for programmatic navigation
  const navigate = useNavigate();

  // Search filter form state for search parameters
  const [searchParams, setSearchParams] = useState({
    exactPhrase: '',
    hasWords: '',
    excludeWords: '',
    website: '',
    dateRange: 'any'
  });

  const dateOptions = [
    { value: 'any', label: 'Any time' },
    { value: 'hour', label: 'Past hour' },
    { value: 'day', label: 'Past 24 hours' },
    { value: 'week', label: 'Past week' },
  ];

  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validation for search filter form - search valid if exact phrase or has words are present
  const isSearchValid = () => {
    const hasSearchTerms = searchParams.exactPhrase || searchParams.hasWords || searchParams.website;
    return hasSearchTerms;
  };

  // For removing the search filter form when clicking outside of it
  const filterRef = useRef(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle search filter using NewsApiService based on search parameters
   */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!isSearchValid()) {
      return;
    }
    setLoading(true);

    try {
      const query = buildQueryFromParams(searchParams);

      // Fetch articles from API
      const fetchedResults = await NewsApiService.searchArticles(query);
      onFilteredResults(fetchedResults); 
      navigate('/search');
      
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
      setIsExpanded(false);
    }
  };

  /**
   * Clear the search filter form and reset the search parameters
   */
  const handleClear = () => {
    setSearchParams({
      exactPhrase: '',
      hasWords: '',
      excludeWords: '',
      website: '',
      dateRange: 'any'
    });
    onFilteredResults([]);
  };

  /**
   * Handle form submission when pressing Enter key.
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e);
    }
  };

  /**
   * Effect to close the search filter form when clicking outside of it.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div className="search-filter__container" ref={filterRef} >
      <div className="search-filter__bar">
        <Search className="search-filter__icon" />
        <input
          type="text"
          placeholder="Search articles based on title and description"
          className="search-filter__input"
          value={searchParams.exactPhrase}
          name="exactPhrase"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="search-filter__expand-button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronDown
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s',
            }}
          />
        </button>
      </div>

      {isExpanded && (
        <form onSubmit={handleSearch} className="search-filter__form">
          <div className="search-filter__group">
            <label>Exact phrase</label>
            <input
              type="text"
              name="exactPhrase"
              value={searchParams.exactPhrase}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="search-filter__group">
            <label>Has words</label>
            <input
              type="text"
              name="hasWords"
              value={searchParams.hasWords}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="search-filter__group">
            <label>Exclude words</label>
            <input
              type="text"
              name="excludeWords"
              value={searchParams.excludeWords}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="search-filter__group">
            <label>Website</label>
            <input
              type="text"
              name="website"
              value={searchParams.website}
              placeholder='e.g. abcnews.go.com, techcrunch.com, bbc.co.uk'
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="search-filter__group">
            <label>Date range</label>
            <select
              className='search-filter__select'
              name="dateRange"
              value={searchParams.dateRange}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            >
              {dateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="search-filter__actions">
            <button 
              className='search-filter__clear' 
              type="button" 
              onClick={handleClear}>
              Clear
            </button>
            <button 
              className="search-filter__submit"
              type="submit" 
              disabled={ loading || !isSearchValid() }
            >
              { loading ? 'Searching...' : 'Search' }
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewsSearchFilter;