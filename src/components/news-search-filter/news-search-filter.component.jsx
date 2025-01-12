import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import './news-search-filter.styles.css';

const NewsSearchFilter = ({ 
  // onSearch,
  articles = [],
  activeCategory = 'General',
  onFilteredResults = () => { }
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
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
    { value: 'year', label: 'Past year' }
  ];

  const filterArticles = (params) => {
    // Add null checks
    if (!articles || !Array.isArray(articles)) {
      console.warn('Articles prop is missing or invalid');
      return [];
    }

    let filtered = articles.filter(article =>
      article.category.includes(activeCategory)
    );

    if (params.exactPhrase) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(params.exactPhrase.toLowerCase())
      );
    }

    if (params.hasWords) {
      const words = params.hasWords.split(' ');
      filtered = filtered.filter(article =>
        words.some(word => article.title.toLowerCase().includes(word.toLowerCase()))
      );
    }

    if (params.excludeWords) {
      const excludedWords = params.excludeWords.split(' ');
      filtered = filtered.filter(article =>
        !excludedWords.some(word => article.title.toLowerCase().includes(word.toLowerCase()))
      );
    }

    if (params.website) {
      filtered = filtered.filter(article =>
        article.source.name.toLowerCase().includes(params.website.toLowerCase())
      );
    }

    if (params.dateRange !== 'any') {
      const now = new Date();
      filtered = filtered.filter(article => {
        const articleDate = new Date(article.publishedAt);
        switch (params.dateRange) {
          case 'hour':
            return (now - articleDate) <= 3600000;
          case 'day':
            return (now - articleDate) <= 86400000;
          case 'week':
            return (now - articleDate) <= 604800000;
          case 'year':
            return (now - articleDate) <= 31536000000;
          default:
            return true;
        }
      });
    }

    return filtered;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSearch(searchParams);
    const filteredResults = filterArticles(searchParams);
    if (typeof onFilteredResults === 'function') {
      onFilteredResults(filteredResults);
    }
    setIsExpanded(false);
  };

  const handleClear = () => {
    setSearchParams({
      exactPhrase: '',
      hasWords: '',
      excludeWords: '',
      website: '',
      dateRange: 'any'
    });
  };

  return (
    <div className="search-filter__container">
      <div className="search-filter__bar">
        <Search className="search-filter__icon" />
        <input
          type="text"
          placeholder="Search for topics, locations & sources"
          className="search-filter__input"
          value={searchParams.hasWords}
          onChange={(e) => handleInputChange({
            target: { name: 'hasWords', value: e.target.value }
          })}
        />
        <button
          className="search-filter__expand-button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronDown
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s'
            }}
          />
        </button>
      </div>

      {/* Display search filter form when expanded */}
      {isExpanded && (
        <form onSubmit={handleSubmit} className="search-filter__form">
          <div className="search-filter__header">
            Narrow your search results
          </div>

          <div className="search-filter__group">
            <label className="search-filter__label">Exact phrase</label>
            <input
              type="text"
              name="exactPhrase"
              value={searchParams.exactPhrase}
              onChange={handleInputChange}
              className="search-filter__control"
            />
          </div>

          <div className="search-filter__group">
            <label className="search-filter__label">Has words</label>
            <input
              type="text"
              name="hasWords"
              value={searchParams.hasWords}
              onChange={handleInputChange}
              className="search-filter__control"
            />
          </div>

          <div className="search-filter__group">
            <label className="search-filter__label">Exclude words</label>
            <input
              type="text"
              name="excludeWords"
              value={searchParams.excludeWords}
              onChange={handleInputChange}
              className="search-filter__control"
            />
          </div>

          <div className="search-filter__group">
            <label className="search-filter__label">Website</label>
            <input
              type="text"
              name="website"
              value={searchParams.website}
              onChange={handleInputChange}
              className="search-filter__control"
            />
          </div>

          <div className="search-filter__group">
            <label className="search-filter__label">Date</label>
            <select
              name="dateRange"
              value={searchParams.dateRange}
              onChange={handleInputChange}
              className="search-filter__select"
            >
              {dateOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="search-filter__actions">
            <button
              type="button"
              onClick={handleClear}
              className="search-filter__clear"
            >
              Clear
            </button>
            <button
              type="submit"
              className="search-filter__submit"
            >
              Search
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewsSearchFilter;