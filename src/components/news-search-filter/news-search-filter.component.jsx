import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import './news-search-filter.styles.css';

const NewsSearchFilter = ({ onSearch }) => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
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