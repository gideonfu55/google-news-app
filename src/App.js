import logo from './logo.svg';
import './App.css';

import { categories } from './constants/constants';
import { v4 as uuidv4 } from 'uuid';

// import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import useNewsArticles from './hooks/useNewsArticles';
import NewsFeedBox from './components/news-feed-box/news-feed-box.component';
import NewsSearchFilter from './components/news-search-filter/news-search-filter.component';
import NavigationBar from './routes/navigation/navigation-bar.component';
import NewsCategoryRoute from './components/news-category-route/news-category-route.component';
import HomePage from './routes/home/home-page.component';
import CircleLoaderWidget from './widgets/circle-loader.widget';


const App = () => {

  // const location = useLocation();

  const {
    articles,
    categoryArticles,
    searchResults,
    loading,
    fetchCategoryArticles,
    setSearchResults,
  } = useNewsArticles();

  // Clear search results when navigating to a new route
  // useEffect(() => {
  //   if (location.pathname !== '/') {
  //     setSearchResults([]);
  //   }
  // }, [location, setSearchResults]);

  if (loading) {
    return (
      <CircleLoaderWidget isLoading={loading} />
    );
  }

  console.log('Rendering App with searchResults:', searchResults);

  // For debugging current routes:
  // console.log('Current Route:', location.pathname);
  console.log('Search Results State:', searchResults);

  return (
    <Router>
        {/* Navigation bar to display categories and logo */}
        <NavigationBar />

        <br />
        {/* Search filter to filter news articles based on search criteria */}
        <div className="search-filter">
          <NewsSearchFilter
            articles={articles}
            onFilteredResults={(filtered) => {
              console.log('Updating Search Results State:', filtered);
              setSearchResults(filtered)}
            }
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
            key={uuidv4()}
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
        <Route
          path="/"
          element={
            searchResults.length > 0 ? (
              <NewsFeedBox articles={searchResults} />
            ) : (
              <div>
                 {/* Default to HomePage if no search results */}
                <h3>No results were found in search</h3>
                <br />
                <HomePage />
              </div>
            )
          }
        />

      </Routes>
    </Router>
  );
};

export default App;
