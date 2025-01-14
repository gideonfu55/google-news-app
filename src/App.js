import logo from './logo.svg';
import './App.css';

import { categories } from './constants/constants';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import useNewsArticles from './hooks/useNewsArticles';
import NewsFeedBox from './components/news-feed-box/news-feed-box.component';
import NewsSearchFilter from './components/news-search-filter/news-search-filter.component';
import NavigationBar from './routes/navigation/navigation-bar.component';
import NewsCategoryRoute from './components/news-category-route/news-category-route.component';
import HomePage from './routes/home/home-page.component';

const App = () => {

  const {
    articles,
    categoryArticles,
    searchResults,
    loading,
    fetchCategoryArticles,
    setSearchResults,
  } = useNewsArticles();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
        {/* Navigation bar to display categories and logo */}
        <NavigationBar />

        <br />
        {/* Search filter to filter news articles based on search criteria */}
        <div className="search-filter">
          <NewsSearchFilter
            articles={articles}
            onFilteredResults={(filtered) => setSearchResults(filtered)}
          />
        </div>
        
        {/* Placeholder icon for development in progress 🙂 */}
        <div className="App">
          <header className="App-header">
            <div style={{ display: 'flex', flexDirection:'column', textAlign: 'center', alignItems: 'center' }}>
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Google News App - Almost there! 🚀
            </p>
          </header>
        </div>

      {/* Routes for navigating to different categories of articles based on navigation-bar */}
      <Routes>
        <Route path="/home" element={<HomePage />} />

        {categories.map((category) => (
          <Route
            key={category}
            path={`/${category}`}
            element={
              <NewsCategoryRoute
                category={category}
                articles={categoryArticles[category] || []}
                fetchCategoryArticles={fetchCategoryArticles}
              />
            }
          />
        ))}
        
        {/* Default route to display search results */}
        <Route path="/" element={<NewsFeedBox articles={searchResults} />} />

      </Routes>
    </Router>
  );
};

export default App;
